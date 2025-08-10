import { StudentFilters, Student } from "@/components/students/types";

export async function getStudentsWithInfo({
  search,
  section,
  status,
  year,
}: StudentFilters) {

  try {
    const reponse = await fetch(
      `http://localhost:3000/api/estudiantes?status=${status}&year=${year}&section=${section}&search=${search}`
    );
    const students = (await reponse.json()) as Student[];
  
    return students;
    
  } catch (error) {
    console.log(error );
    
    return [];
    
  }

}

export async function getYears() {
  const newYearsReponse =  await fetch(`http://localhost:3000/api/anos`);
  const years = await newYearsReponse.json();
  return years;
}


export async function getSections({id}:{id:number}) {
  const newSectionsReponse =  await fetch(`http://localhost:3000/api/secciones?userId=${id}`);
  const sections = await newSectionsReponse.json();
  return sections;
}

export async function getStudentsPageData({id}: {id:number}) {

  const data = await Promise.all([getYears(), getSections({id})])
  return data;
}