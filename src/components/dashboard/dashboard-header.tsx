import { Button } from "@/components/ui/button"
import { UserCheck } from "lucide-react"

export function DashboardHeader({profName = "unknow"}:{profName?:string}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mi Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Prof. {profName}</p>
      </div>
      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
        <UserCheck className="mr-2 h-4 w-4" />
        Nueva Evaluación
      </Button>
    </div>
  )
}
