import { getDocentesFullInfo } from "@/lib/api/docentes"
import Grid from "@/components/ui/grid"
import { Pagination } from "@/components/ui/pagination"
import { type Session } from "next-auth"
import { DocentesCard } from "@/components/docentes/docentes-card"


export async function DocentesGrid({ searchParams, session }: { searchParams: any, session: Session }) {
    const { user: { id, role } } = session
    const { search = '', section = "todos", page = 1, status = "toos", year = "todos" } = searchParams


    const docentes = await getDocentesFullInfo({ role, userId: id })















    if (docentes.length === 0) {
        return (
            <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                    <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No se encontraron estudiantes
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Intenta ajustar los filtros o agregar nuevos estudiantes.
                </p>
            </div>
        )
    }

    return (
        <>
            <Grid className="xl:grid-cols-2! ">
                {docentes.map((docent) => (
                    <DocentesCard
                        key={docent.id_docente}
                        teacher={docent}
                    />
                ))}
            </Grid>
            <Pagination totalPages={2} currentPage={page} />
        </>
    )
}
