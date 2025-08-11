import { Badge } from "@/components/ui/badge"

interface GradeBadgeProps {
  score: number
  maxScore: number
  type?: "exam" | "homework" | "project" | "quiz"
}

export function GradeBadge({ score, maxScore, type }: GradeBadgeProps) {
  const percentage = (score / maxScore) * 100
  
  const getVariant = (percentage: number) => {
    if (percentage >= 90) return "default"
    if (percentage >= 80) return "secondary"
    if (percentage >= 70) return "outline"
    return "destructive"
  }

  const getTypeColor = (type: string) => {
    const colors = {
      exam: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      homework: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      project: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      quiz: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    }
    return colors[type as keyof typeof colors] || colors.homework
  }

  const typeLabels = {
    exam: "Ex",
    homework: "Hw",
    project: "Pr",
    quiz: "Qz",
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
      <Badge variant={getVariant(percentage)} className="font-medium text-xs">
        {score}/{maxScore}
      </Badge>
      {/* <Badge variant="outline" className={`text-xs `}> */}
        {/* <span className="sm:hidden">{typeLabels[type]}</span> */}
        {/* <span className="hidden sm:inline">{type}</span> */}
      {/* </Badge> */}
    </div>
  )
}
