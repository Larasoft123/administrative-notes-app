import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";

interface StudentFormData {
  cedula?: string | null;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  direccion?: string | null;
}

export async function GET(request: NextRequest) {
  const students = await Students.getStudentsInfo();

  return NextResponse.json(students);
}

export async function POST(request: NextRequest) {
  let {apellido,fecha_nacimiento,nombre,cedula = null,direccion = null} = (await request.json()) as StudentFormData; 

  cedula == '' ? cedula = null : null;
  direccion == '' ? direccion = null : null;

  try {
    const student = await Students.createStudent({apellido,fecha_nacimiento,nombre,cedula,direccion });

    return NextResponse.json({ student });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear el estudiante" }, { status: 500 });
  }
}

class Students {
  static async getStudentsInfo(): Promise<any[] | Error> {
    try {
      const students = await sql`WITH estudiante_promedios_materias AS (
    SELECT
        e.id_estudiante,
        a.nombre_ano,
        s.nombre_seccion,
        m.nombre_materia,
        ROUND(AVG(n.calificacion), 2) AS promedio_materia,
        STRING_AGG(n.calificacion::text, ', ' ORDER BY n.fecha_registro) AS notas_materia
    FROM
        estudiantes e
    JOIN
        inscripciones i ON e.id_estudiante = i.id_estudiante
    JOIN
        periodos_escolares pe ON i.id_periodo_escolar = pe.id_periodo_escolar
    JOIN
        anos a ON i.id_ano = a.id_ano
    JOIN
        secciones s ON i.id_seccion = s.id_seccion
    JOIN
        notas n ON i.id_inscripcion = n.id_inscripcion
    JOIN
        cursos c ON n.id_curso = c.id_curso
    JOIN
        materias m ON c.id_materia = m.id_materia
    WHERE
        pe.activo = TRUE
    GROUP BY
        e.id_estudiante,
        a.nombre_ano,
        s.nombre_seccion,
        m.nombre_materia
)
SELECT
    e.nombres AS estudiante_nombres,
    e.apellidos AS estudiante_apellidos,
    T1.nombre_ano,
    T1.nombre_seccion,
    (
        SELECT ROUND(AVG(n_general.calificacion), 2)
        FROM notas n_general
        JOIN inscripciones i_general ON n_general.id_inscripcion = i_general.id_inscripcion
        WHERE i_general.id_estudiante = e.id_estudiante
        AND i_general.id_periodo_escolar IN (SELECT id_periodo_escolar FROM periodos_escolares WHERE activo = TRUE)
    ) AS promedio_general,
    STRING_AGG(
        'Materia: ' || T1.nombre_materia || ', Promedio: ' || T1.promedio_materia || ', Notas: [' || T1.notas_materia || ']',
        ' | '
    ) AS detalle_materias
FROM
    estudiantes e
JOIN
    estudiante_promedios_materias T1 ON e.id_estudiante = T1.id_estudiante
GROUP BY
    e.id_estudiante,
    e.nombres,
    e.apellidos,
    T1.nombre_ano,
    T1.nombre_seccion
ORDER BY
    T1.nombre_ano,
    T1.nombre_seccion,
    e.apellidos,
    e.nombres;

   
    `;
      return students;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los estudiantes");
    }
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
        "INSERT INTO estudiantes(cedula,nombres, apellidos,fecha_nacimiento,direccion) VALUES($1,$2,$3,$4,$5)",
        [cedula, nombre, apellido, fecha_nacimiento, direccion]
      );
      

      return student;
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el estudiante");
    }
  }
}
