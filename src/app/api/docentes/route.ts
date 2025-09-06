import { NextRequest, NextResponse } from "next/server";
import { checkIsAdmin } from "@/middleware/auth-middleware";
import { Docentes } from "@/models/docentes";


export async function GET(req: NextRequest) {
    const authResult = await checkIsAdmin(req);
    if (!authResult.ok) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {searchParams} = req.nextUrl
    const fullInfo = searchParams.get("fullInfo") === "true"

    const teacherName = searchParams.get("search")
    const subjectName = searchParams.get("subject")
    const yearName = searchParams.get("year")
    const sectionName = searchParams.get("section")
    const ActiveUser = searchParams.get("activeUser") !== null ? searchParams.get("activeUser") === "true" : null;
    const periodoName = searchParams.get("periodo_escolar")
    const page = Number(searchParams.get("page")) || 1;
    


    
 
    

    try {
        if (fullInfo) {
            const docentes = await Docentes.getDocentesFullInfo({periodoName,ActiveUser,sectionName,page,teacherName,subjectName,yearName})
            return NextResponse.json(docentes);
        }
            

        const docentes = await Docentes.getDocentes()
        return NextResponse.json(docentes);
        
    } catch (error) {
        return NextResponse.json({message: 'Error al obtener los docentes'}, {status: 500});
        
    }


  


}


