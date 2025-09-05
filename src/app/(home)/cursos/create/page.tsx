
import { CreateCurseForm } from "@/components/cursos/forms/create-curso-form"
import { getYears } from "@/lib/api/years"
import { getSections } from "@/lib/api/sections"
import { getPeriodos } from "@/lib/api/periodos-escolares"
import { getSubjects } from "@/lib/api/materias"
import { getDocentes } from "@/lib/api/docentes"
import { getSessionServer } from "@/utils/session"



export default async function Page() {

    const session = await getSessionServer()
    if (!session) {
        return <div>No se ha iniciado sesión</div>
    }
    const { user: { id, role } } = session


    if (role !== "Admin") {
        return <div>No tienes permisos para crear cursos</div>
    }


    const [years, sections, periodosEscolares, materias, docentes] = await Promise.all([
        getYears(),
        getSections({ id }),
        getPeriodos(),
        getSubjects({ role, userId: id }),
        getDocentes({ userId: id, role })
    ])






    return (
        <div>
            <CreateCurseForm
                materias={materias}
                docentes={docentes}
                anos={years}
                secciones={sections}
                periodosEscolares={periodosEscolares}
            />

        </div>
    )
}
