import { Badge } from "@/components/ui/badge"

interface TaskItemProps {
  task: string
  date: string
  type: "exam" | "grades" | "meeting" | "project"
}

export function TaskItem({ task, date, type }: TaskItemProps) {
  const typeConfig = {
    exam: { color: "bg-red-500", label: "Examen" },
    grades: { color: "bg-blue-500", label: "Notas" },
    meeting: { color: "bg-green-500", label: "Reunión" },
    project: { color: "bg-purple-500", label: "Proyecto" },
  }

  const config = typeConfig[type]

  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className={`w-3 h-3 rounded-full ${config.color}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{task}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
      </div>
      <Badge variant="outline" className="text-xs">
        {config.label}
      </Badge>
    </div>
  )
}
