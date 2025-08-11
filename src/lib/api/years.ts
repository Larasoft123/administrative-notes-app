import { AñoData } from "@/types/types.d";

export async function getYears(): Promise<AñoData[]> {

  try {
    const newYearsReponse =  await fetch(`http://localhost:3000/api/anos`);
    const years = await newYearsReponse.json() as AñoData[];
    return years;
  } catch (error) {
    return []
  }
   

}