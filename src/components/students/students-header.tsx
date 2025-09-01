import { Button } from "@/components/ui/button"
import { UserPlus, Download, Upload } from 'lucide-react'
import Link from "next/link"


export function StudentsHeader({ }) {
  return (
    <header className="flex sm:flex-row flex-col gap-y-4  items-center sm:justify-between">
      <div>
        <h1 className="text-3xl text-center text-balance sm:text-start font-bold text-gray-900 dark:text-white">Estudiantes</h1>
        <p className="text-gray-600 text-center text-balance sm:text-start dark:text-gray-400 mt-1">
          Gestiona la información y calificaciones de tus estudiantes
        </p>
      </div>
      <div className="flex sm:flex-row flex-wrap sm:flex-nowrap gap-y-4 justify-center items-center space-x-2">
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Importar
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
        <Link href="/estudiantes/create">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" >
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Estudiante
          </Button>
        </Link>
      </div>
    </header>
  )
}
