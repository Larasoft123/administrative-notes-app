import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityItem } from "@/components/dashboard/activity-item"


interface Evaluation {
  id_evaluacion: number
  nombre_evaluacion: string
  descripcion_evaluacion: string
  nombre_ano : string
  nombre_seccion : string
  tipo_evaluacion : string

}

const getEvaluationsData = async ({id}:{id:number}) => {

    try {
        const res = await fetch(`http://localhost:3000/api/evaluaciones?userId=${id}`)
        const data = (await res.json()) as Evaluation[]
        return data    
    } catch (error) {
        console.error(error)
        return []
        
    }

}

export async function UpcomingActivitys({userId}: {userId: number}) {

  const evaluations = await getEvaluationsData({id: userId})
  

  
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
            <ActivityItem key={evaluation.id_evaluacion}  nombre={evaluation.nombre_evaluacion} type={evaluation.tipo_evaluacion} descripcion_evaluacion={evaluation.descripcion_evaluacion} />
          ))
        }

        </div>
      </CardContent>
    </Card>
  )
}
