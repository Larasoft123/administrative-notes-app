import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { BookOpen, } from "lucide-react"

interface SubjectCardProps {
  name: string
  sections: any[]
  totalStudents?: number
  avgGrade?: number


}





export function SubjectCard({ name, sections, totalStudents, avgGrade, }: SubjectCardProps) {
  console.log(sections);

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <BookOpen className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {sections.map((section, idx) => {
           
          
            return (

              <Badge key={`${name}-${section.año}-${section.seccion} `} variant="secondary" className="text-xs">
                {`${section.año} ${section.seccion}`}
              </Badge>
            )
          }
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Estudiantes:</span>
            <p className="font-medium">20</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Promedio:</span>
            <p className="font-medium">9</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
