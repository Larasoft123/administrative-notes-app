import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SubjectCard } from "@/components/dashboard/subject-card"



interface Subject {
  name: string
  sections: string[]
}


interface SubjectsGridProps {
  subjects?: Subject[]
}

export function SubjectsGrid({subjects = []}: SubjectsGridProps) {

  

  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Materias y Secciones</CardTitle>
        <CardDescription>Estado actual de las materias que imparto</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {subjects.map(({name,sections}, index) => (
            <SubjectCard
              key={name}
              name={name}
              sections={sections}
           
              
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
