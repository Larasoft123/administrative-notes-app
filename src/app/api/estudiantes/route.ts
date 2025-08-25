import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { Student } from "@/types/types.d";
import { getSessionServer } from "@/utils/session";
import { revalidatePath } from "next/cache";
import { cn } from "@/lib/utils";

interface StudentFormData {
  cedula?: string | null;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  direccion?: string | null;
  inscribirlo: boolean;
  ano?: number;
  seccion?: number;
}

type statusOptions = "todos" | "activo" | "inactivo";

interface studentFilters {
  name: string;
  año: string;
  seccion: string;
  status: statusOptions;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("search")?.toLowerCase() ?? "";
  const section = searchParams.get("section") ?? "todos";
  const status = (searchParams.get("status") ?? "todos") as statusOptions;
  const year = searchParams.get("year") ?? "todos";
  const info = searchParams.get("info") ?? false;

  try {
    if (info) {
      const students = (await Students.getStudentsInfo({
        name,
        seccion: section,
        status,
        año: year,
      })) as Student[];
      revalidatePath("/estudiantes");
      return NextResponse.json(students);      
    }


    const students = (await Students.getStudents())
    return NextResponse.json(students);







  } catch (error) {}
}

export async function POST(request: NextRequest) {
  const session = await getSessionServer();
  if (!session || session.user.role !== "Admin") {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  let {
    apellido,
    fecha_nacimiento,
    nombre,
    cedula = null,
    direccion = null,
    inscribirlo,
    ano,
    seccion,
  } = (await request.json()) as StudentFormData;

  cedula == "" ? (cedula = null) : null;
  direccion == "" ? (direccion = null) : null;

  try {
    const student = (
      await Students.createStudent({
        inscribirlo: false,
        apellido,
        fecha_nacimiento,
        nombre,
        cedula,
        direccion,
      })
    )[0];

    if (inscribirlo) {
      const inscripcion = await Students.inscribeStudent({
        id_ano: Number(ano),
        id_seccion: Number(seccion),
        id_student: student.id_estudiante,
      });
      console.log(inscripcion);

      return NextResponse.json({ inscripcion });
    }

    return NextResponse.json({ student });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear el estudiante" },
      { status: 500 }
    );
  }
}

class Students {
  static async getStudentsInfo({
    name,
    año,
    seccion,
    status,
  }: studentFilters): Promise<Student[] | Error> {
    try {
      const sqlQuery = `
WITH estudiante_promedios_activos AS (
    SELECT
        e.id_estudiante, a.nombre_ano, s.nombre_seccion, m.nombre_materia,
        ROUND(AVG(n.calificacion), 2) AS promedio_materia,
        STRING_AGG(n.calificacion::text, ',' ORDER BY l.id_lapso) AS notas_materia
    FROM estudiantes e
    JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
    JOIN periodos_escolares pe ON i.id_periodo_escolar = pe.id_periodo_escolar
    JOIN anos a ON i.id_ano = a.id_ano
    JOIN secciones s ON i.id_seccion = s.id_seccion
    LEFT JOIN notas n ON i.id_inscripcion = n.id_inscripcion
    LEFT JOIN evaluaciones evalu ON n.id_evaluacion = evalu.id_evaluacion
    LEFT JOIN cursos c ON evalu.id_curso = c.id_curso
    LEFT JOIN materias m ON c.id_materia = m.id_materia
    LEFT JOIN lapsos l ON evalu.id_lapso = l.id_lapso
    WHERE
        pe.activo = TRUE
    GROUP BY e.id_estudiante, a.nombre_ano, s.nombre_seccion, m.nombre_materia
),
detalle_agrupado_por_estudiante AS (
    SELECT
        t1.id_estudiante, t1.nombre_ano, t1.nombre_seccion,
        (SELECT ROUND(AVG(n_gen.calificacion), 2)
         FROM notas n_gen
         JOIN inscripciones i_gen ON n_gen.id_inscripcion = i_gen.id_inscripcion
         WHERE i_gen.id_estudiante = t1.id_estudiante AND i_gen.id_periodo_escolar = (SELECT id_periodo_escolar FROM periodos_escolares WHERE activo = TRUE)) AS promedio_general,
        STRING_AGG('Materia: ' || COALESCE(t1.nombre_materia, 'N/A') || ', Promedio: ' || COALESCE(t1.promedio_materia::text, 'S/N') || ', Notas: [' || COALESCE(t1.notas_materia, '') || ']',' | ') AS detalle_materias
    FROM estudiante_promedios_activos t1
    GROUP BY t1.id_estudiante, t1.nombre_ano, t1.nombre_seccion
)
SELECT
    e.id_estudiante AS id,
    e.nombres, e.apellidos,
    COALESCE(MAX(t2.nombre_ano), 'Inactivo') AS ano,
    COALESCE(MAX(t2.nombre_seccion), 'N/A') AS seccion,
    COALESCE(MAX(t2.promedio_general), 0.00) AS promedio_general,
    COALESCE(MAX(t2.detalle_materias), 'Sin actividad en el período actual.') AS detalle_materias,
    CASE WHEN MAX(t2.id_estudiante) IS NOT NULL THEN 'Activo' ELSE 'Inactivo' END AS status
FROM estudiantes e
LEFT JOIN detalle_agrupado_por_estudiante t2 ON e.id_estudiante = t2.id_estudiante
WHERE
    ($1 = '' OR (e.nombres || ' ' || e.apellidos) ILIKE $1 || '%')
    AND (
        (LOWER($4) = 'todos') OR
        (LOWER($4) = 'activo' AND t2.id_estudiante IS NOT NULL) OR
        (LOWER($4) = 'inactivo' AND t2.id_estudiante IS NULL)
    )
GROUP BY e.id_estudiante, e.nombres, e.apellidos
HAVING
    (LOWER($2) = 'todos' OR COALESCE(MAX(t2.nombre_ano), 'Inactivo') = $2)
    AND (LOWER($3) = 'todos' OR COALESCE(MAX(t2.nombre_seccion), 'N/A') = $3)
ORDER BY ano, seccion, e.apellidos, e.nombres;
    `;

      const params = [name, año, seccion, status];

      const students = (await sql.query(sqlQuery, params)) as Student[];

      return students;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los estudiantes");
    }
  }

  static async getStudents() {
    const students = await sql.query("SELECT * FROM estudiantes ORDER BY apellidos, nombres");
    return students;
  }

  static async createStudent({
    apellido,
    fecha_nacimiento,
    nombre,
    cedula,
    direccion,
  }: StudentFormData) {
    try {
      const student = await sql.query(
        "INSERT INTO estudiantes(cedula,nombres, apellidos,fecha_nacimiento,direccion) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [cedula, nombre, apellido, fecha_nacimiento, direccion]
      );

      return student;
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el estudiante");
    }
  }

  static async inscribeStudent({
    id_student,
    id_ano,
    id_seccion,
  }: {
    id_student: number;
    id_ano: number;
    id_seccion: number;
  }) {
    const id_periodo_escolar = Number(
      (
        await sql.query(
          "SELECT id_periodo_escolar FROM periodos_escolares WHERE activo = TRUE"
        )
      )[0].id_periodo_escolar
    );

    console.log(id_periodo_escolar);
    console.log(typeof id_periodo_escolar);

    const query = `INSERT INTO 
    inscripciones (id_estudiante,id_ano,id_seccion,id_periodo_escolar)  
    VALUES($1,$2,$3,$4)
    `;

    const params: any[] = [id_student, id_ano, id_seccion, id_periodo_escolar];

    try {
      const inscripcion = await sql.query(query, params);
      return inscripcion;
    } catch (error) {
      console.log(error);

      throw new Error("Error al inscribir el estudiante");
    }
  }
}
