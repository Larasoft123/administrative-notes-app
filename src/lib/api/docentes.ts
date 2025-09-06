import { Docente,Teacher } from "@/types/types.d"



interface baseParams {
    userId: number
    role: "Admin" | "Docente"
}

export async function getDocentes({userId,role}: baseParams):Promise<Docente[]>  {

    try {
        const res = await fetch(`http://localhost:3000/api/docentes?userId=${userId}&role=${role}`)
        const data = (await res.json()) as Docente[]
     
        
        return data  
    } catch (error) {
        return []
    }

    
}


export async function getDocentesFullInfo({role,userId}:baseParams) {
    try {
        const res = await fetch(`http://localhost:3000/api/docentes?userId=${userId}&role=${role}&fullInfo=true`)
        const data = await res.json() as Teacher[]
        return data
    } catch (error) {
        console.log(error );
        return []
        
    }
    
}