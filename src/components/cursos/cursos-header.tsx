import { Button } from "@/components/ui/button"
import { UserPlus } from 'lucide-react'
import Link from "next/link"


export function CursosHeader({ }) {


    return (
        <header className="flex sm:flex-row flex-col gap-y-4  items-center sm:justify-between">
            <div>
                <h1 className="text-3xl text-center text-balance sm:text-start font-bold text-gray-900 dark:text-white">Cursos</h1>
                <p className="text-gray-600 text-center text-balance sm:text-start dark:text-gray-400 mt-1">
                    Gestiona informacion sobre los cursos
                </p>
            </div>
            <div className="flex sm:flex-row flex-wrap sm:flex-nowrap gap-y-4 justify-center items-center space-x-2">


                <Link href="/cursos/create">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Crear curso
                    </Button>
                </Link>
            </div>
        </header>
    )
}
