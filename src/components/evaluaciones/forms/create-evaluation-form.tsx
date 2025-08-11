"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2, BookOpen, Calendar, GraduationCap } from "lucide-react"
import { LapsoData } from "@/types/types"
import { AñoData,SeccionData } from "@/types/types.d"

const evaluationSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  lapso: z.string().min(1, "Selecciona un lapso"),
  materia: z.string().min(1, "Selecciona una materia"),
  seccion: z.string().min(1, "Selecciona una sección"),
  periodo_escolar: z.string().min(1, "Selecciona un período escolar"),
  ano: z.string().min(1, "Selecciona un año"),
})


interface EvaluationFormProps {
  anos: AñoData[]
  secciones: SeccionData[]
  periodos_escolares?: string[]
  materias?: string[],
  lapsos: LapsoData[]
}






type EvaluationFormData = z.infer<typeof evaluationSchema>

export function EvaluationForm({anos,secciones,periodos_escolares,materias,lapsos}: EvaluationFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    
    formState: { errors,isLoading },
  } = useForm<EvaluationFormData>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      lapso: "",
      materia: "",
      seccion: "",
      periodo_escolar: "",
      ano: "",
    },
  })

  console.log({anos,secciones,lapsos});
  

  const onSubmit = async (data: EvaluationFormData) => {
   
    try {
      // Simular envío de datos
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Datos de la evaluación:", data)

   

      reset()
    } catch (error) {
   
    } 
  }

  return (
    <Card className="shadow-xl border-0 backdrop-blur-sm  dark:backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Formulario de Evaluación
          </CardTitle>
        </div>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          Completa todos los campos para crear una nueva evaluación
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Información básica */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Información Básica</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nombre" className="font-medium">
                Nombre de la Evaluación
              </Label>
              <Input
                id="nombre"
                placeholder="Ej: Examen Unidad 1"
                className=""
                {...register("nombre")}
              />
              {errors.nombre && <p className="text-sm text-red-600 dark:text-red-400">{errors.nombre.message}</p>}
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ingresa un nombre descriptivo para la evaluación
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion" className="font-medium">
                Descripción
              </Label>
              <Textarea
                id="descripcion"
                placeholder="Describe el contenido y objetivos de la evaluación..."
                className=" min-h-[100px] resize-none"
                {...register("descripcion")}
              />
              {errors.descripcion && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.descripcion.message}</p>
              )}
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Proporciona detalles sobre el contenido de la evaluación
              </p>
            </div>
          </div>

          {/* Configuración académica */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Configuración Académica</h3>
            </div>

            <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lapso" className="font-medium">
                  Lapso
                </Label>
                <Select onValueChange={(value) => setValue("lapso", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona el lapso" />
                  </SelectTrigger>
                  <SelectContent>

                    {lapsos.map(({id,nombre}) => <SelectItem key={`lapso ${id}`} value={String(id)} >{nombre}</SelectItem> )}
                 
                  </SelectContent>
                </Select>
                {errors.lapso && <p className="text-sm text-red-600 dark:text-red-400">{errors.lapso.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="materia" className="font-medium">
                  Materia
                </Label>
                <Select onValueChange={(value) => setValue("materia", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona la materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematicas">Matemáticas</SelectItem>
                    <SelectItem value="lengua">Lengua y Literatura</SelectItem>
                    <SelectItem value="ciencias">Ciencias Naturales</SelectItem>
                    <SelectItem value="historia">Historia</SelectItem>
                    <SelectItem value="geografia">Geografía</SelectItem>
                    <SelectItem value="ingles">Inglés</SelectItem>
                    <SelectItem value="educacion_fisica">Educación Física</SelectItem>
                    <SelectItem value="arte">Educación Artística</SelectItem>
                  </SelectContent>
                </Select>
                {errors.materia && <p className="text-sm text-red-600 dark:text-red-400">{errors.materia.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="seccion" className="font-medium">
                  Sección
                </Label>
                <Select onValueChange={(value) => setValue("seccion", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona la sección" />
                  </SelectTrigger>
                  <SelectContent>
                
                    {secciones.map(({id,nombre})=> <SelectItem key={`seccion ${id}`}  value={String(id)} >Sección {nombre}</SelectItem> )}
                  </SelectContent>
                </Select>
                {errors.seccion && <p className="text-sm text-red-600 dark:text-red-400">{errors.seccion.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="periodo_escolar" className="font-medium">
                  Período Escolar
                </Label>
                <Select onValueChange={(value) => setValue("periodo_escolar", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona el período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                    <SelectItem value="2026-2027">2026-2027</SelectItem>
                  </SelectContent>
                </Select>
                {errors.periodo_escolar && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.periodo_escolar.message}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ano" className="font-medium">
                  Año Escolar
                </Label>
                <Select onValueChange={(value) => setValue("ano", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona el año escolar" />
                  </SelectTrigger>
                  <SelectContent>
                     {anos.map(({id,nombre})=> <SelectItem  key={`año ${id}`} value={String(id)} >{nombre}</SelectItem> )}                  
                  </SelectContent>
                </Select>
                {errors.ano && <p className="text-sm text-red-600 dark:text-red-400">{errors.ano.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando Evaluación...
                </>
              ) : (
                "Crear Evaluación"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isLoading}
              className="px-6 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-900"
            >
              Limpiar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
