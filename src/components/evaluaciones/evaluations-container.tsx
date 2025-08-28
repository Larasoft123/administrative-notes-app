

import { getEvaluations } from "@/lib/api/evaluaciones"
import Grid from "@/components/ui/grid"
import { EvaluationCard } from "@/components/evaluaciones/evaluation-card"


export async function Evaluationscontainer({ id }: { id: number }) {
    const evaluations = await getEvaluations({ id })


    return (

        <>
            {evaluations.length === 0 && <h4 className="text-center text-2xl mt-6">No hay evaluaciones pendientes</h4>}

            <Grid>

                {evaluations.map((evaluation) => (<EvaluationCard key={evaluation.id_evaluacion} evaluation={evaluation} />))}






            </Grid>
        </>

    )
}
