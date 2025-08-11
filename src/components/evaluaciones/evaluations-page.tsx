import { EvaluationsHeader } from "@/components/evaluaciones/evaluations-header"
import { EvaluationsFilter } from "@/components/evaluaciones/evaluations-filters"

export  function EvaluationsPage() {
  return (
    <div className="space-y-6">

        <EvaluationsHeader/>

        <EvaluationsFilter />



    </div>
  )
}
