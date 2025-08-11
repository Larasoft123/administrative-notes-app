import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SubjectCard } from "@/components/dashboard/subject-card"
import { sql } from "@/lib/db"
import { getSessionServer } from "@/utils/session"



interface Subject {
  name: string
  sections: string[]
}


interface SubjectsGridProps {
  subjects?: Subject[]
}

export async function SubjectsGrid({  }) {

  

      const session = await getSessionServer()
      if (!session) {
          return <div>No se ha iniciado sesión</div>
      }
      const { user: { id } } = session
  

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
  
      const materiasProcesadas = namesMaterias.map((key) => {
          const años: any[] = []
          materias[key]?.forEach((materia) => {
              años.push({ año: materia.ano_impartido, seccion: materia.seccion_impartida })
          })
          return { name: key, sections: años }
      })
  
  
  
        await new Promise((resolve) => setTimeout(resolve, 2000));




  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Materias y Secciones</CardTitle>
        <CardDescription>Estado actual de las materias que imparto</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">


          {
            materiasProcesadas.length === 0 ? <h4 className="lg:text-start text-center">No tienes materias</h4> : (
              materiasProcesadas.map(({ name, sections }, index) => (
                <SubjectCard
                  key={name}
                  name={name}
                  sections={sections}
                />
              ))
            )
          }


        </div>
      </CardContent>
    </Card>
  )
}
