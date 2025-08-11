import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ChartsContainer } from "@/components/dashboard/charts-container"
import { UpcomingActivitys } from "@/components/dashboard/upcoming-activitis"
import { SubjectsGrid } from "@/components/dashboard/subjects-grid"
import { sql } from "@/lib/db"
import { Suspense } from "react"
import { PeformanceChartsSkeleton } from "@/components/dashboard/performance-charts-skeleton"
import { getSessionServer } from "@/utils/session"
import { UpcomingActivitiesSkeleton } from "@/components/dashboard/upcoming-activities-skeleton"
import { SubjectsGridSkeleton } from "@/components/dashboard/subjects-grid-skeleton"

export async function DashboardContent() {


    const session = await getSessionServer()
    if (!session) {
        return <div>No se ha iniciado sesión</div>
    }
    const { user: { id, role } } = session


    const [{ promedio_estudiantes }] = await sql`SELECT
      ROUND(AVG(n.calificacion),2) AS promedio_estudiantes 
  FROM
      estudiantes e
  JOIN
      inscripciones i ON e.id_estudiante = i.id_estudiante
  JOIN
      periodos_escolares pe ON i.id_periodo_escolar = pe.id_periodo_escolar
  JOIN
      notas n ON i.id_inscripcion = n.id_inscripcion
  WHERE
      pe.activo = TRUE;`



    const materiasDocent = await sql`SELECT
      d.id_docente as docente_id,
      d.nombres AS docente_nombres,
      d.apellidos AS docente_apellidos,
      m.nombre_materia,
      a.nombre_ano AS ano_impartido,
      s.nombre_seccion AS seccion_impartida,
      pe.nombre AS periodo_escolar_impartido
  FROM
      docentes d
  JOIN
      cursos c ON d.id_docente = c.id_docente
  JOIN
      materias m ON c.id_materia = m.id_materia
  JOIN
      anos a ON c.id_ano = a.id_ano
  JOIN
      secciones s ON c.id_seccion = s.id_seccion
  JOIN
      periodos_escolares pe ON c.id_periodo_escolar = pe.id_periodo_escolar
  WHERE
      d.id_docente = ${id} 
  ORDER BY
      d.apellidos,
      d.nombres,
      m.nombre_materia,
      ano_impartido,
      seccion_impartida;
  `

    const materias = Object.groupBy(materiasDocent, (materia) => materia.nombre_materia)

    const namesMaterias = Object.keys(materias)
















    return (
        <div className="space-y-6">
            {/* Page Header */}
            <DashboardHeader />

            {/* Stats Cards */}
            <StatsCards promedio={+promedio_estudiantes} materias={namesMaterias} />

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Charts Section */}
                <Suspense fallback={<PeformanceChartsSkeleton />}>
                    <ChartsContainer />
                </Suspense>

                <Suspense fallback={<UpcomingActivitiesSkeleton />}>
                    <UpcomingActivitys userId={id} />
                </Suspense>
            </div>

            {/* Subjects Section */}

            <Suspense fallback={<SubjectsGridSkeleton />}>
                <SubjectsGrid />
            </Suspense>
        </div>
    )
}
