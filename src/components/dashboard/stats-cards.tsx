import { Users, GraduationCap, BookOpen, Award, TrendingUp, BarChart3, } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { sql } from "@/lib/db"

export async function StatsCards({}) {
  const [{total}] = await sql`SELECT count(cedula) as total FROM estudiantes`

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Mis Estudiantes"
        value={total}
        icon={Users}
        description="6 secciones activas"
        descriptionIcon={GraduationCap}
        trend="neutral"
      />
      <StatCard
        title="Promedio General"
        value="8.3"
        icon={Award}
        description="+0.2 este mes"
        descriptionIcon={TrendingUp}
        trend="up"
      />
      <StatCard
        title="Materias"
        value={3}
        icon={BookOpen}
        description="Matemáticas, Álgebra, Geometría"
        descriptionIcon={BarChart3}
        trend="neutral"
      />
  
    </div>
  )
}
