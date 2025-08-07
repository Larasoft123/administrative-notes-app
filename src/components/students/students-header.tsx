import { Button } from "@/components/ui/button"
import { UserPlus, Download, Upload } from 'lucide-react'

interface StudentsHeaderProps {
  onAddStudent?: () => void
  onExport?: () => void
  onImport?: () => void
}

export function StudentsHeader({ onAddStudent, onExport, onImport }: StudentsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Estudiantes</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Gestiona la información y calificaciones de tus estudiantes
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={onImport}>
          <Upload className="mr-2 h-4 w-4" />
          Importar
        </Button>
        <Button variant="outline" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" onClick={onAddStudent}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Estudiante
        </Button>
      </div>
    </div>
  )
}
