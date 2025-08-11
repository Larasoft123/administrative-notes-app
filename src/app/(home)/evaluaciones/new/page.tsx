import { EvaluationForm } from "@/components/evaluaciones/forms/create-evaluation-form"
import {getStudentsPageData} from "@/lib/api/students"
import { getSessionServer } from "@/utils/session"
import { getLapsos } from "@/lib/api/lapsos"
export default async function CreateEvaluationPage() {
  const session = await getSessionServer()
  if(!session){
    return <div>No se ha iniciado sesión</div>
  }
  const {user : {id}} = session


  const [years, sections] = await getStudentsPageData({id})
  const lapsos = await getLapsos({userId: id})

  


  
  
  
  
  return (
    <div>
        <EvaluationForm anos={years} secciones={sections} lapsos={lapsos}  />
    </div>
  )
}
