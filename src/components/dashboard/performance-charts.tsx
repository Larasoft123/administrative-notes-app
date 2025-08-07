"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

const gradesDistribution = [
  { name: "Excelente (9-10)", value: 12, color: "#10b981" },
  { name: "Muy Bueno (8-9)", value: 18, color: "#3b82f6" },
  { name: "Bueno (7-8)", value: 15, color: "#f59e0b" },
  { name: "Regular (6-7)", value: 4, color: "#ef4444" },
]



interface PerformanceChartsProps {
  sectionsPerformance: any[]
}



export function PerformanceCharts({ sectionsPerformance }: PerformanceChartsProps) {


  





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
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectionsPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="section" />
                  <YAxis domain={[0, 20]} />
                  <Tooltip
                 
                    formatter={(value, name) => {             
                      return [
                        value,
                        name === "promedio" ? "Promedio" : "Estudiantes",
                      ]
                    }}
                  />
                  <Bar dataKey="promedio" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                 
                 
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradesDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${value} estudiantes`}
                  >
                    {gradesDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
