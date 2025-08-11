import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SubjectCardSkeleton } from "@/components/dashboard/subject-card-skeleton"




export async function SubjectsGridSkeleton({  }) {




  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Materias y Secciones</CardTitle>
        <CardDescription>Estado actual de las materias que imparto</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            <SubjectCardSkeleton/>
            <SubjectCardSkeleton/>
            <SubjectCardSkeleton/>
            <SubjectCardSkeleton/>
        </div>
      </CardContent>
    </Card>
  )
}
