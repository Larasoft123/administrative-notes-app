import { NextRequest, NextResponse } from "next/server";
import { checkIsAdmin } from "@/middleware/auth-middleware";
import { sql } from "@/lib/db";
import { Docente } from "@/types/types.d";



export async function GET(req: NextRequest) {
    const authResult = await checkIsAdmin(req);
    if (!authResult.ok) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const docentes = await Docentes.getDocentes()
        return NextResponse.json(docentes);
        
    } catch (error) {
        return NextResponse.json({message: 'Error al obtener los docentes'}, {status: 500});
        
    }


  


}



class Docentes {
   static async getDocentes(): Promise<Docente[] | Error>{
    const query =  `SELECT nombres,apellidos,id_docente FROM docentes ORDER BY nombres, apellidos`
    try {
        const data = await sql.query(query) as Docente[]
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los docentes");
    }
   }
}