"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

const sectionPerformance = [
  { section: "1° A", promedio: 8.5, estudiantes: 25 },
  { section: "1° B", promedio: 7.8, estudiantes: 24 },
  { section: "2° A", promedio: 8.2, estudiantes: 23 },
  { section: "2° B", promedio: 7.9, estudiantes: 22 },
  { section: "3° A", promedio: 8.7, estudiantes: 26 },
  { section: "3° B", promedio: 8.1, estudiantes: 25 },
]

const gradesDistribution = [
  { name: "Excelente (9-10)", value: 12, color: "#10b981" },
  { name: "Muy Bueno (8-9)", value: 18, color: "#3b82f6" },
  { name: "Bueno (7-8)", value: 15, color: "#f59e0b" },
  { name: "Regular (6-7)", value: 4, color: "#ef4444" },
]

const studentsData = [
  { month: "Ene", estudiantes: 45 },
  { month: "Feb", estudiantes: 47 },
  { month: "Mar", estudiantes: 44 },
  { month: "Abr", estudiantes: 46 },
  { month: "May", estudiantes: 48 },
  { month: "Jun", estudiantes: 49 },
]

export function PerformanceCharts({}) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Análisis de Rendimiento</CardTitle>
        <CardDescription>Estadísticas de mis estudiantes y secciones</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Por Secciones</TabsTrigger>
            <TabsTrigger value="grades">Distribución Notas</TabsTrigger>
            <TabsTrigger value="evolution">Evolución</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectionPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="section" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "promedio" ? `${value}` : value,
                      name === "promedio" ? "Promedio" : "Estudiantes",
                    ]}
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

          <TabsContent value="evolution" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="estudiantes"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
