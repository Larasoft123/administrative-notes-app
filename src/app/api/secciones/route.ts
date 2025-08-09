import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { SeccionData } from "@/components/students/types";



export async function GET(request: NextRequest) {
  try {
    const secciones = await Secciones.getSecciones();
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
      const data = await sql.query(query) as SeccionData[];
    
      
      return data;
    } catch (error) {
        throw new Error("Error al obtener los años");
    }
  }
}
