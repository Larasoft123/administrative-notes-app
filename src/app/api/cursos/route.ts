import { NextResponse, type NextRequest } from "next/server";
import { getSessionServer } from "@/utils/session";
import { CurseFormData } from "@/types/types.d";
import { Cursos } from "@/models/cursos";



export async function GET(req: NextRequest) {
  const session = await getSessionServer();
  if (!session) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  const {
    user: { id, role },
  } = session;

  try {
    const curses = await Cursos.getCursesOfTeacher({ id });
    return NextResponse.json(curses);
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  const { id_materia, id_docente, id_ano, id_seccion, id_periodo_escolar } =
    (await req.json()) as CurseFormData;
  const session = await getSessionServer();

  if (!session) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { user } = session;

  if (user.role !== "Docente") {
    return NextResponse.json(
      { error: "No tienes permisos para crear cursos" },
      { status: 401 }
    );
  }

  try {
    const curse = await Cursos.createCurse({
      id_materia,
      id_docente,
      id_ano,
      id_seccion,
      id_periodo_escolar,
    });
    return NextResponse.json(curse);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear el curso" },
      { status: 500 }
    );
  }
}

