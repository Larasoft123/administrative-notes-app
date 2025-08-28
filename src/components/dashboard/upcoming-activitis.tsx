import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityItem } from "@/components/dashboard/activity-item"
import { getEvaluations } from "@/lib/api/evaluaciones"



export async function UpcomingActivitys({ userId }: { userId: number }) {

  const evaluations = await getEvaluations({ id: userId })



  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas Actividades</CardTitle>
        <CardDescription>Tareas y eventos pendientes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {
            evaluations.length === 0 ? <h4 className="text-center">No hay evaluaciones pendientes</h4> :
              evaluations.map((evaluation,) => (
                <ActivityItem key={evaluation.id_evaluacion} nombre={evaluation.nombre_evaluacion} type={evaluation.tipo_evaluacion} descripcion_evaluacion={evaluation.descripcion_evaluacion} />
              ))
          }

        </div>
      </CardContent>
    </Card>
  )
}
