
import { StudentsHeader } from "@/components/students/students-header"
import { StudentsFilters } from "@/components/students/students-filters"
import { StudentsGrid } from "@/components/students/students-grid"
import { getStudentsPageData } from "@/components/students/lib/fetch-data"
import { StudentFilters } from "./types"
import { Suspense } from "react"



export async function StudentsPage({ searchParams }: { searchParams: StudentFilters }) {



  const [years, sections] = await getStudentsPageData()












  return (
    <div className="space-y-6">
      <StudentsHeader />

      <StudentsFilters
        años={years}
        secciones={sections}
      />




      <Suspense    fallback={<div>Loading...</div>}>
        <StudentsGrid
          searchParams={searchParams}
        />
      </Suspense>

    </div>
  )
}
