import { SeccionData } from "@/types/types.d";

export async function getSections({id}:{id:number}): Promise<SeccionData[]> {

  try {
    const newSectionsReponse =  await fetch(`http://localhost:3000/api/secciones?userId=${id}`);
    const sections = await newSectionsReponse.json() as SeccionData[];
    return sections;
    
  } catch (error) {

    return []
    
  }
}

