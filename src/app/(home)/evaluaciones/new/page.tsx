import { EvaluationForm } from "@/components/evaluaciones/forms/create-evaluation-form"
import { getStudentsPageData } from "@/lib/api/students"
import { getSessionServer } from "@/utils/session"
import { getLapsos } from "@/lib/api/lapsos"
import { getSubjects } from "@/lib/api/materias"
import { getPeriodos } from "@/lib/api/periodos-escolares"
import { getTiposEvaluaciones } from "@/lib/api/tipos-evaluaciones"



export default async function CreateEvaluationPage() {
  const session = await getSessionServer()
  if (!session) {
    return <div>No se ha iniciado sesión</div>
  }
  const { user: { id, role } } = session


  const [years, sections] = await getStudentsPageData({ id })

  const [lapsos, materias, periodos, tiposEvaluaciones] = await Promise.all([
    getLapsos({ userId: id }),
    getSubjects({ userId: id, role }),
    getPeriodos(),
    getTiposEvaluaciones()
  ])











  return (
    <div>
      <EvaluationForm tiposEvaluaciones={tiposEvaluaciones} periodos_escolares={periodos} materias={materias} anos={years} secciones={sections} lapsos={lapsos} />
    </div>
  )
}
