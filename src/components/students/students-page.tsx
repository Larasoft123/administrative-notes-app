
import { StudentsHeader } from "@/components/students/students-header"
import { StudentsFilters } from "@/components/students/students-filters"
import { StudentsGrid } from "@/components/students/students-grid"
import { getStudentsPageData } from "@/lib/api/students"
import { StudentFilters } from "@/types/types.d"
import { Suspense } from "react"
import { getSessionServer } from "@/utils/session"



export async function StudentsPage({ searchParams }: { searchParams: StudentFilters }) {


  const session = await getSessionServer()

  if (!session) {
    return <div>No se ha iniciado sesión</div>
  }

  const [years, sections] = await getStudentsPageData({id:session.user.id})















  return (
    <div className="space-y-6">
      <StudentsHeader />

      <StudentsFilters
        años={years}
        secciones={sections}
      />




      <Suspense fallback={<div>Loading...</div>}>
        <StudentsGrid
          searchParams={searchParams}
        />
      </Suspense>

    </div>
  )
}
