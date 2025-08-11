import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { AñoData } from "@/types/types.d";




export async function GET(request: NextRequest) {
  try {
    const años = await Años.getAños();
    return NextResponse.json(años);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los años" },
      { status: 500 }
    );
  }
}



class Años {
  static async getAños(): Promise<AñoData[] | Error> {
    try {
      const query = `SELECT id_ano AS id, nombre_ano AS nombre FROM anos`;
      const data = await sql.query(query) as AñoData[];
    
      
      return data;
    } catch (error) {
        throw new Error("Error al obtener los años");
    }
  }
}
