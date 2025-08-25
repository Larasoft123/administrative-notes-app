import { NextRequest, NextResponse } from "next/server";
import { getSessionServer } from "@/utils/session";
import { EvaluacionFormData } from "@/types/types.d";
import { Evaluaciones } from "@/models/evaluaciones";
import { Cursos } from "@/models/cursos";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  let id = Number(searchParams.get("userId")) ?? null;
  const search = searchParams.get("search") ?? "";
  const year = searchParams.get("year") ?? "todos";
  const section = searchParams.get("section") ?? "todos";

  if (!id) {
    const session = await getSessionServer();

    if (!session) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }

    id = session.user.id;
  }

  try {
    const evaluations = await Evaluaciones.getEvaluationsOfTeacher({
      id,
      search,
      year,
      section,
    });
    return NextResponse.json(evaluations);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las evaluaciones" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getSessionServer();
  if (!session || session.user.role !== "Admin") {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const {
    descripcion_evaluacion,
    id_lapso,
    id_tipo_evaluacion,
    nombre,
    id_ano,
    id_materia,
    id_periodo_escolar,
    id_seccion,
  } = (await req.json()) as EvaluacionFormData;

  try {
    const [curse] = await Cursos.getCurse({
      id_ano,
      id_materia,
      id_periodo_escolar,
      id_seccion,
    });

    const id_curso = curse?.id_curso ?? null;

    


    if (!id_curso) {
      return NextResponse.json(
        { error: "No puede crear una evaluacion a un curso que no existe, asegurate de que el curso existe" },
        { status: 500 }
      );
    }

    const newEvaluation = await Evaluaciones.createEvaluation({
      descripcion_evaluacion,
      id_curso,
      id_lapso,
      id_tipo_evaluacion,
      nombre,
    });
    console.log(newEvaluation);
    return NextResponse.json(newEvaluation);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
