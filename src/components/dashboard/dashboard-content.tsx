import { DashboardHeader } from "@//components/dashboard/dashboard-header"
import { StatsCards } from "@//components/dashboard/stats-cards"
import { PerformanceCharts } from "@//components/dashboard/performance-charts"
import { UpcomingTasks } from "@//components/dashboard/upcoming-tasks"
import { SubjectsGrid } from "@//components/dashboard/subjects-grid"
import { sql } from "@/lib/db"

export async function DashboardContent() {
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
    d.cedula = '32986552' 
ORDER BY
    d.apellidos,
    d.nombres,
    m.nombre_materia,
    ano_impartido,
    seccion_impartida;
`


  const materias = Object.groupBy(materiasDocent, (materia) => materia.nombre_materia)


  const materiasProcesadas = Object.keys(materias).map((key) => {
    const años: any[] = []
    materias[key]?.forEach((materia) => {
      años.push({ año: materia.ano_impartido, seccion: materia.seccion_impartida })
    })
    return {name: key, sections: años}
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <DashboardHeader />

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Charts Section */}
        <PerformanceCharts />

        {/* Upcoming Tasks */}
        <UpcomingTasks />
      </div>

      {/* Subjects Section */}
      <SubjectsGrid subjects={materiasProcesadas} />
    </div>
  )
}
