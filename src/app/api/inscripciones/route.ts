import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getSessionServer } from "@/utils/session";

interface InscripcionFormData {
  id_estudiante: number;
  id_ano: number;
  id_seccion: number;
  id_periodo_escolar: number;
}

export async function POST(req: NextRequest) {
  const { id_estudiante, id_ano, id_seccion, id_periodo_escolar } =
    (await req.json()) as InscripcionFormData;
  const session = await getSessionServer();
  if (!session) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  const { user } = session;

  if (user.role !== "Admin") {
    return NextResponse.json(
      { error: "No tienes permisos para crear cursos" },
      { status: 401 }
    );
  }

  try {
    const inscripcion = await Inscripciones.createInscripcion({
      id_estudiante,
      id_ano,
      id_seccion,
      id_periodo_escolar,
    });
    return NextResponse.json(inscripcion);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear el curso" },
      { status: 500 }
    );
  }
}

class Inscripciones {
  static async createInscripcion({
    id_ano,
    id_estudiante,
    id_periodo_escolar,
    id_seccion,
  }: InscripcionFormData) {
    const query = `INSERT INTO inscripciones(id_estudiante,id_ano,id_seccion,id_periodo_escolar) VALUES($1,$2,$3,$4)`;
    const params = [id_estudiante, id_ano, id_seccion, id_periodo_escolar];



    try {
        const inscripcion = await sql.query(query, params);
        return inscripcion;    
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el curso");
    }






  }
}
