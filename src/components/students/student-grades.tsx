import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { GradeBadge } from "@/components/students/grade-badge"
import type { Grade } from "./types"

interface StudentGradesProps {
  grades: Grade[]
  average: number
}

export function StudentGrades({ grades, average }: StudentGradesProps) {
  const getAverageColor = (avg: number) => {
    if (avg >= 9) return "text-green-600"
    if (avg >= 8) return "text-blue-600"
    if (avg >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Calificaciones</CardTitle>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getAverageColor(average)}`}>
              {average.toFixed(1)}
            </div>
            <CardDescription>Promedio</CardDescription>
          </div>
        </div>
        <Progress value={average * 10} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {grades.slice(0, 4).map((grade, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex-1">
                <p className="font-medium text-sm">{grade.subject}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{grade.date}</p>
              </div>
              <GradeBadge score={grade.score} maxScore={grade.maxScore} type={grade.type} />
            </div>
          ))}
          {grades.length > 4 && (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              +{grades.length - 4} calificaciones más
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
