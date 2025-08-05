import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskItem } from "@/components/dashboard/task-item"

const upcomingTasks = [
  { task: "Examen de Álgebra - 3° A", date: "Mañana", type: "exam" as const },
  { task: "Entrega de notas - 1° A", date: "Viernes", type: "grades" as const },
  { task: "Reunión de padres - 2° B", date: "Lunes", type: "meeting" as const },
  { task: "Proyecto final - 3° B", date: "Próxima semana", type: "project" as const },
]

export function UpcomingTasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas Actividades</CardTitle>
        <CardDescription>Tareas y eventos pendientes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingTasks.map((task, index) => (
            <TaskItem key={index} task={task.task} date={task.date} type={task.type} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
