import { StudentFilters, Student } from "@/types/types.d";
import { getYears } from "@/lib/api/years";
import { getSections } from "@/lib/api/sections";

export async function getStudentsWithInfo({
  search,
  section,
  status,
  year,
}: StudentFilters) {

  try {
    const reponse = await fetch(
      `http://localhost:3000/api/estudiantes?status=${status}&info=true&year=${year}&section=${section}&search=${search}`
    );
    const students = (await reponse.json()) as Student[];
  
    return students;
    
  } catch (error) {
    console.log(error );
    
    return [];
    
  }

}




export async function getStudents() {
  try {
    const reponse = await fetch(`http://localhost:3000/api/estudiantes`);
    const data = (await reponse.json())

    const students = data.map((student: any)=> {
      return {
        id_estudiante: student.id_estudiante,
        nombre_completo: `${student.nombres} ${student.apellidos}`,

      }
    })
    return students;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getStudentsPageData({id}: {id:number}) {

  const data = await Promise.all([getYears(), getSections({id})])
  return data;
}