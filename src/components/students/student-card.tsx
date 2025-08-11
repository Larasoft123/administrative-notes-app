"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from 'lucide-react'
import { StudentAvatar } from "@/components/students/student-avatar"
import { StudentGrades } from "@/components/students/student-grades"
import type { Student } from "@/types/types.d"

interface StudentCardProps {
  student: Student
  onViewDetails?: (student: Student) => void
}

export function StudentCard({ student, onViewDetails }: StudentCardProps) {
  const statusColors = {
    activo: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    inactivo: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <StudentAvatar name={student.nombres} size="md" />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm sm:text-lg text-gray-900 dark:text-white truncate">
                {student.nombres}
              </h3>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {student.ano} {student.seccion}
                </Badge>
                <Badge className={`text-xs ${statusColors[student.status]}`}>
                  {student.status.toLowerCase() === "activo" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails?.(student)}
            className="ml-2 shrink-0"
          >
            <Eye className="h-4 w-4" />
         
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          
        </div>
        <StudentGrades grades={student.detalle_materias} average={+student.promedio_general} />
      </CardContent>
    </Card>
  )
}
