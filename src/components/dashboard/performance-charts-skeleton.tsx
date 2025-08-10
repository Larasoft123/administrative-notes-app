
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from '@/components/ui/skeleton'


export function PeformanceChartsSkeleton() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Análisis de Rendimiento</CardTitle>
        <CardDescription>Estadísticas de mis estudiantes y secciones</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="performance">Por Secciones</TabsTrigger>
            <TabsTrigger value="grades">Distribución Notas</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="h-[300px]">
              <Skeleton className="h-full w-full" />
            </div>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4">
            <div className="h-[300px]">
              <Skeleton className="h-full w-full" />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
