import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";

type PromedioSelect = "estudiantes" | "secciones" | "materias";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const { searchParams } = url;

  const promedioSelect = searchParams.get("entidad") as PromedioSelect;

  try {
    if (promedioSelect === "estudiantes") {
      const promedio = await Promedio.estudiantes();
      return NextResponse.json({ promedio });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

class Promedio {
  static async estudiantes(): Promise<number | Error> {
    try {
      const [{ promedio_estudiantes }] = await sql`SELECT
          ROUND(AVG(n.calificacion),2) AS promedio_estudiantes 
      FROM
          estudiantes e
      JOIN
          inscripciones i ON e.id_estudiante = i.id_estudiante
      JOIN
          periodos_escolares pe ON i.id_periodo_escolar = pe.id_periodo_escolar
      JOIN
          notas n ON i.id_inscripcion = n.id_inscripcion
      WHERE
          pe.activo = TRUE;`;

      return promedio_estudiantes;
    } catch (error) {
      throw new Error("Error al obtener el promedio de estudiantes");
    }
  }
}
