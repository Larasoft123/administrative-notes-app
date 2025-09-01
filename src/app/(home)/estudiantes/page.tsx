import { StudentsPage } from "@/components/students/students-page"
import { StudentFilters } from "@/components/students/types"



export default async function Page({ searchParams }: { searchParams: StudentFilters }) {
    const params = (await searchParams)


    return (
        <div className="min-h-screen">
            <StudentsPage searchParams={params} />
        </div>
    )
}
