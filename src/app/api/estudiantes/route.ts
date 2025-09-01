import { NextResponse, type NextRequest } from "next/server";
import { Student,StudentFormData } from "@/types/types.d";
import { getSessionServer } from "@/utils/session";

import { Students } from "@/models/estudiantes";



type statusOptions = "todos" | "activo" | "inactivo";



export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("search")?.toLowerCase() ?? "";
  const section = searchParams.get("section") ?? "todos";
  const status = (searchParams.get("status") ?? "todos") as statusOptions;
  const year = searchParams.get("year") ?? "todos";
  const periodos_escolares = searchParams.get("periodo_escolar") ?? "todos";
  const info = searchParams.get("info") ?? false;
  const page = Number(searchParams.get("page")) ?? 1;


  
  try {
    if (info) {
      const students = (await Students.getStudentsInfo({
        name,
        seccion: section,
        status,
        año: year,
        periodos_escolares,
        page
      })) as Student[];

      const totalPages = await Students.getStudentsTotalPages({
        name,
        seccion: section,
        status,
        año: year,
        periodos_escolares
      });

      
      return NextResponse.json({ students, totalPages });
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

