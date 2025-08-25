import { TipoEvaluacion } from "@/types/types.d";


export async function getTiposEvaluaciones() {
    try {
        const response = await fetch(`http://localhost:3000/api/tipos-evaluaciones`);
        const data = (await response.json()) as TipoEvaluacion[]
        return data
    } catch (error) {
        return []
    }
    
}