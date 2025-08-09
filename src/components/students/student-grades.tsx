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
    if (avg >= 18) return "text-green-600"
    if (avg >= 14) return "text-blue-600"
    if (avg >= 10) return "text-yellow-600"
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
        <Progress value={average * 5} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {grades.slice(0, 4).map((grade, index) => (
            <div key={grade.subject} className="flex  items-start justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex-1">
                <p className="font-medium text-sm">{grade.subject} </p>
                {/* <p className="text-xs text-gray-500 dark:text-gray-400">{grade.average}</p> */}
              </div>


              <div className="flex flex-wrap justify-end gap-4">
                {grade.notes.map((note,index) => <GradeBadge key={index} score={note} maxScore={20} />)}
              </div>
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
