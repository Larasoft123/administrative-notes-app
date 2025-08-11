import {NextRequest,NextResponse} from "next/server"
import { sql } from "@/lib/db"
import { getSessionServer } from "@/utils/session"
import { LapsoData } from "@/types/types.d";






export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;

    let id = Number(searchParams.get("userId")) ?? null;


    if (!id) {
        const session = await getSessionServer();
        if (!session) {
            return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
        }
        id = session.user.id;
    }



    
    try {
        const lapsos = await Lapsos.getLapsos()
        return NextResponse.json(lapsos);
    } catch (error) {
        return NextResponse.json({error: "Error al obtener los lapsos"}, {status:500})
    }
    
}









class Lapsos {
    static async getLapsos(){
        const query = `SELECT id_lapso AS id, nombre_lapso AS nombre FROM lapsos`;


        try {
            const data = await sql.query(query) as LapsoData[];
        
            return data;
            
        } catch (error) {
            throw new Error("Error al obtener los lapsos");
            
        }

    }
    }
