import { NextResponse, type NextRequest } from "next/server";
import { getSessionServer } from "@/utils/session";
import { CurseFormData } from "@/types/types.d";
import { Cursos } from "@/models/cursos";
import { checkIsAdmin } from "@/middleware/auth-middleware";



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

  const authResult = await checkIsAdmin(req);
  if (!authResult.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id_materia, id_docente, id_ano, id_seccion, id_periodo_escolar } =
    (await req.json()) as CurseFormData;




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

