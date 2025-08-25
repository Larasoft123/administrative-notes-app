import { NextRequest, NextResponse } from "next/server";
import { Materias } from "@/models/materias";
import { getSessionServer } from "@/utils/session";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  let id = Number(searchParams.get("userId")) ?? null;
  let role = (searchParams.get("role") ?? null) as "Admin" | "Docente";


  if (!(id || role)) {
    const session = await getSessionServer();
    if (!session) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }
  
    id = session.user.id;
    role = session.user.role;

  }

  try {
    const materias = await Materias.getSubjects({
      role,
      userId: id,
    });
    return NextResponse.json(materias);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las materias" },
      { status: 500 }
    );
  }
}
