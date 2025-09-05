import { NextRequest, NextResponse } from "next/server";
import { PeriodosEscolares } from "@/models/periodos-escolares";
import { checkIsAdmin } from "@/middleware/auth-middleware";







export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');




    try {

        if (!action) {
            const periodo = await PeriodosEscolares.getActivePeriodo();
            return NextResponse.json({ periodo });
        }
        
        const periodos = await PeriodosEscolares.getPeriodos();
       return NextResponse.json({ periodos });            



    } catch (error) {
        
    }
    
}



export async function POST(req:NextRequest) {
    const authResult = await checkIsAdmin(req)
    if (!authResult.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); 
  }
 
    
    
}