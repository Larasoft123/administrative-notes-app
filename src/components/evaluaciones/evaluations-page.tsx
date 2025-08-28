import { EvaluationsHeader } from "@/components/evaluaciones/evaluations-header"
// import { EvaluationsFilter } from "@/components/evaluaciones/evaluations-filters"
import { Evaluationscontainer } from "@/components/evaluaciones/evaluations-container"
import { getSessionServer } from "@/utils/session"

export async function EvaluationsPage() {
  const session = await getSessionServer()
  if (!session) {
    return <div>No se ha iniciado sesión</div>
  }
  const { user: { id, role } } = session
  return (
    <div className="space-y-6">

      <EvaluationsHeader />

      {/* <EvaluationsFilter /> */}
      <Evaluationscontainer id={id} />



    </div>
  )
}
