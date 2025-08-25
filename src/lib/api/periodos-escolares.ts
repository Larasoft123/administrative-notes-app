import { type PeriodoEscolar } from "@/types/types.d";






export async function getPeriodos(): Promise<PeriodoEscolar[]> {
    try {
        const response = await fetch(`http://localhost:3000/api/periodos-escolares`);
        const data = (await response.json())
        const periodos = (data.periodo) as PeriodoEscolar[]
        
        
        return periodos   
    } catch (error) {
        console.log(error );
        return [];
        
        
    }
}
    










