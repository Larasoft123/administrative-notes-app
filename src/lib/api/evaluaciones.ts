import { Evaluation } from "@/types/types.d"



export const getEvaluations = async ({id}:{id:number}) => {

    try {
        const res = await fetch(`http://localhost:3000/api/evaluaciones?userId=${id}`)
        const data = (await res.json()) as Evaluation[]
        return data    
    } catch (error) {
        console.error(error)
        return []
        
    }

}