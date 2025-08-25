import { NextRequest, NextResponse } from "next/server";
// import { getSessionServer } from "@/utils/session";
import { TiposEvaluaciones } from "@/models/tipos-evaluaciones";





export async function GET(req:NextRequest) {
   


    try {
        
        const tiposEvaluaciones = await TiposEvaluaciones.getTiposEvaluaciones()
        return NextResponse.json(tiposEvaluaciones);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Error al obtener los tipos de evaluaciones'}, {status: 500});
        
    }


}









