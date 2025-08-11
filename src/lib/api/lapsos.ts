import { LapsoData } from "@/types/types";







export async function getLapsos({userId} : {userId: number}) {

    try {
        const newLapsoReponse =  await fetch(`http://localhost:3000/api/lapsos?userId=${userId}`);
        const lapsos = await newLapsoReponse.json() as LapsoData[];
        return lapsos;        
    } catch (error) {
        return []
        
    }
}