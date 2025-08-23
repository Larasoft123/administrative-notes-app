import { Users, GraduationCap, BookOpen, Award, TrendingUp, BarChart3, } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { sql } from "@/lib/db"
import { getSessionServer } from "@/utils/session"
import {getPromedioEstudiantes,getMedianaEstudiantes} from "@/lib/api/notas"


export async function StatsCards({ materias }: { materias: string[], }) {
  const session = await getSessionServer()

  if (!session) {
    return <div>No se ha iniciado sesión</div>
  }


  const params = [session.user.id]
  const query = `SELECT
    COUNT(DISTINCT e.id_estudiante) AS total_estudiantes_impartidos,
    COUNT(DISTINCT m.id_materia) AS total_materias_impartidas
FROM
    docentes d
JOIN
    cursos c ON d.id_docente = c.id_docente
JOIN
    materias m ON c.id_materia = m.id_materia
JOIN
    periodos_escolares pe ON c.id_periodo_escolar = pe.id_periodo_escolar
LEFT JOIN 
    inscripciones i ON c.id_ano = i.id_ano AND c.id_seccion = i.id_seccion AND c.id_periodo_escolar = i.id_periodo_escolar
LEFT JOIN 
    estudiantes e ON i.id_estudiante = e.id_estudiante
WHERE
    d.id_docente = $1
    AND pe.activo = TRUE; 
`


  const promedio = await getPromedioEstudiantes({})
  const mediana = await getMedianaEstudiantes({})







  const [{ total_estudiantes_impartidos, total_materias_impartidas }] = await sql.query(query, params)


  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Mis Estudiantes"
        value={total_estudiantes_impartidos}
        icon={Users}
        description={`${total_materias_impartidas} materias impartidas`}
        descriptionIcon={GraduationCap}
        trend="neutral"
      />
      <StatCard
        title="Promedio de mis estudiantes"
        value={promedio}
        icon={Award}
        description="+0.2 este mes"
        descriptionIcon={TrendingUp}
        trend="up"
      />
      <StatCard
        title="Mediana de mis estudiantes"
        value={mediana}
        icon={Award}
        description="+0.2 este mes"
        descriptionIcon={TrendingUp}
        trend="up"
      />
      <StatCard
        title="Materias"
        value={materias.length}
        icon={BookOpen}
        description={materias.join(", ")}
        descriptionIcon={BarChart3}
        trend="neutral"
      />

    </div>
  )
}
