import { InscribeStudentForm } from "@/components/inscripciones/forms/inscribe-student"
import { getYears } from "@/lib/api/years"
import { getSections } from "@/lib/api/sections"
import { getStudents } from "@/lib/api/students"
import { getPeriodos } from "@/lib/api/periodos-escolares"


export default async function InscribePage() {
  const anos = await getYears();
  const sections = await getSections({ id: 10 })
  const students = await getStudents()
  const periodos = await getPeriodos()




  return (
    <div>




      <InscribeStudentForm periodos={periodos} students={students} anos={anos} secciones={sections} />
    </div>
  )
}
