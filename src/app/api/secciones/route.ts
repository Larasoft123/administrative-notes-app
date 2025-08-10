import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { SeccionData } from "@/components/students/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET(request: NextRequest, res: any) {
  const searchParams = request.nextUrl.searchParams;
  const performance = Boolean(searchParams.get("performance")) ?? false;
  let id = Number(searchParams.get("userId")) ?? null;
  let role = searchParams.get("role") ?? null;

  if (!id && !role) {
    // if we dont have userId or Role, we treat to get session from cookie

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    const { user } = session;
    id = user.id;
    role = user.role;
  }

  try {
    if (!performance) {
      const secciones = await Secciones.getSecciones();
      return NextResponse.json(secciones);
    }

    if (role === "Docente") {
      const secciones = await Secciones.getSectionsPerformanceFromTeacher({
        id,
      });

      return NextResponse.json(secciones);
    }
    // se asume que es admin

    const secciones = await Secciones.getSectionsPerformanceFromAdmin();
    return NextResponse.json(secciones);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las secciones" },
      { status: 500 }
    );
  }
}

class Secciones {
  static async getSecciones(): Promise<SeccionData[] | Error> {
    try {
      const query = `SELECT id_seccion AS id, nombre_seccion AS nombre FROM secciones`;
      const data = (await sql.query(query)) as SeccionData[];

      return data;
    } catch (error) {
      throw new Error("Error al obtener los años");
    }
  }

  static async getSectionsPerformanceFromTeacher({
    id,
  }: {
    id: number;
  }): Promise<any | Error> {
    const query = `SELECT
      
      a.nombre_ano || ' ' || s.nombre_seccion AS seccion,
      COALESCE(ROUND(AVG(n.calificacion), 2), 0) AS promedio,

      COUNT(DISTINCT i.id_estudiante) AS estudiantes
  FROM
      cursos c
  JOIN
   
      anos a ON c.id_ano = a.id_ano
  JOIN
      secciones s ON c.id_seccion = s.id_seccion
  JOIN

      inscripciones i ON c.id_ano = i.id_ano AND c.id_seccion = i.id_seccion AND c.id_periodo_escolar = i.id_periodo_escolar
  LEFT JOIN

      evaluaciones ev ON c.id_curso = ev.id_curso
  LEFT JOIN
      notas n ON ev.id_evaluacion = n.id_evaluacion AND i.id_inscripcion = n.id_inscripcion
  WHERE
      -- ** Filtro clave: Aquí debes colocar el ID del docente específico que quieres consultar. **
      c.id_docente = $1 
  GROUP BY
      -- Agrupamos los resultados por año y sección para obtener el promedio por cada una.
      a.nombre_ano,
      s.nombre_seccion
  ORDER BY
      -- Ordenamos la salida para que sea fácil de leer.
      a.nombre_ano,
      s.nombre_seccion;`;

    try {
      const params = [id];

      const sectionsPerformance = await sql.query(query, params);
      console.log(sectionsPerformance);

      return sectionsPerformance;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los años");
    }
  }

  static async getSectionsPerformanceFromAdmin() {
    const query = `SELECT
    a.nombre_ano || ' ' || s.nombre_seccion AS section, 
     COALESCE(ROUND(AVG(n.calificacion), 2),0) AS promedio,
    COUNT(DISTINCT e.id_estudiante) AS estudiantes
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
LEFT JOIN 
    notas n ON i.id_inscripcion = n.id_inscripcion
WHERE
    pe.activo = TRUE 
GROUP BY
    a.nombre_ano,
    s.nombre_seccion
ORDER BY
    a.nombre_ano,
    s.nombre_seccion;
`;

    try {
      const sectionsPerformance = await sql.query(query);

      return sectionsPerformance;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los años");
    }
  }
}
