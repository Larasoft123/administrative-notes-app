import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";


class notas {
  static async getPromedioEstudiantes(): Promise<number | Error> {
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

  static async getMedianaEstudiantes(): Promise<number | Error> {
    try {
      const [{ mediana_estudiantes }] = await sql`SELECT
          PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY n.calificacion) AS mediana_estudiantes 
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



      return mediana_estudiantes;


    } catch (error) {
      throw new Error("Error al obtener la mediana de estudiantes");
    }

  }


  static async getNotasEstudiantes(): Promise<any[] | Error> {
    try {

        const query = `SELECT
       e.nombres AS Nombre,
       e.apellidos AS Apellido,
       ARRAY_AGG(n.calificacion) AS Notas
      FROM
          estudiantes e
      JOIN
          inscripciones i ON e.id_estudiante = i.id_estudiante
      JOIN
          periodos_escolares pe ON i.id_periodo_escolar = pe.id_periodo_escolar
      JOIN
          notas n ON i.id_inscripcion = n.id_inscripcion
          WHERE
          pe.activo = TRUE
    GROUP BY 
    e.id_estudiante,
    e.nombres;`


      const estudiantes = await sql.query(query)



      return estudiantes;
    } catch (error) {
        console.log(error );
        
      throw new Error("Error al obtener el promedio de estudiantes");
    }

  }
}


type Modifier = "promedio" | "mediana"



const ModifierActions: Record<Modifier,()=> Promise<any>> = {
    "mediana": notas.getMedianaEstudiantes,
    "promedio": notas.getPromedioEstudiantes,
}


export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const { searchParams } = url;

  const modifier = (searchParams.get("modifier"))?.toLowerCase() as Modifier | null;

  try {

    if (!modifier) {
        const notasEstudiantes = await notas.getNotasEstudiantes();
        return NextResponse.json({ notasEstudiantes });
    }
    

    const data = await ModifierActions[modifier]();
    console.log(data);
    return NextResponse.json({ data });
    



  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

