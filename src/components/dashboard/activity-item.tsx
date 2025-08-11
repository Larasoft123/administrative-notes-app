import { Badge } from "@/components/ui/badge"

interface TaskItemProps {
  nombre: string
  date?: string
  descripcion_evaluacion: string
  type: string
}

export function ActivityItem({ nombre, descripcion_evaluacion, type }: TaskItemProps) {
  // const typeConfig = {
  //   exam: { color: "bg-red-500", label: "Examen" },
  //   grades: { color: "bg-blue-500", label: "Notas" },
  //   meeting: { color: "bg-green-500", label: "Reunión" },
  //   project: { color: "bg-purple-500", label: "Proyecto" },
  // }

  // const config = typeConfig[type]

  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-200 dark:bg-gray-800">
      <div className={`w-3 h-3 rounded-full bg-red-500`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{nombre}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{descripcion_evaluacion} </p>
      </div>
      <Badge variant="outline" className="text-xs">
        {type}
      </Badge>
    </div>
  )
}
