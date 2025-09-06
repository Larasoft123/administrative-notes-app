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
import { AñoData, SeccionData, Materia, LapsoData, PeriodoEscolar, TipoEvaluacion } from "@/types/types.d"
import { convertObjectDataToNumber } from "@/utils/convert"
import { toast } from "sonner"

const evaluationSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion_evaluacion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  id_lapso: z.string().min(1, "Selecciona un lapso"),
  id_materia: z.string().min(1, "Selecciona una materia"),
  id_seccion: z.string().min(1, "Selecciona una sección"),
  id_periodo_escolar: z.string().min(1, "Selecciona un período escolar"),
  id_ano: z.string().min(1, "Selecciona un año"),
  id_tipo_evaluacion: z.string().min(1, "Selecciona un tipo de evaluación"),
})


interface EvaluationFormProps {
  anos: AñoData[]
  secciones: SeccionData[]
  periodos_escolares: PeriodoEscolar[]
  materias: Materia[],
  lapsos: LapsoData[]
  tiposEvaluaciones: TipoEvaluacion[]
}






type EvaluationFormData = z.infer<typeof evaluationSchema>

export function EvaluationForm({ tiposEvaluaciones, anos, secciones, periodos_escolares, materias, lapsos }: EvaluationFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors, isLoading },
  } = useForm<EvaluationFormData>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      nombre: "",
      descripcion_evaluacion: "",

    },
  })





  const onSubmit = async (data: EvaluationFormData) => {

    try {
      const newData = convertObjectDataToNumber(data)


      const res = await fetch("/api/evaluaciones", {
        method: "POST",
        body: JSON.stringify(newData)
      })

      if (!res.ok) {
        const errorJson = await res.json();
        toast.error(errorJson.error, {
          richColors: true,
          duration: 5000
        })
      }
      const json = await res.json()







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
                {...register("descripcion_evaluacion")}
              />
              {errors.descripcion_evaluacion && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.descripcion_evaluacion.message}</p>
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

            <div className="grid grid-cols-1 justify-center items-center  md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lapso" className="font-medium">
                  Lapso
                </Label>
                <Select onValueChange={(value) => setValue("id_lapso", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona el lapso" />
                  </SelectTrigger>
                  <SelectContent>

                    {lapsos.map(({ id, nombre }) => <SelectItem key={`lapso ${id}`} value={String(id)} >{nombre}</SelectItem>)}

                  </SelectContent>
                </Select>
                {errors.id_lapso && <p className="text-sm text-red-600 dark:text-red-400">{errors.id_lapso.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="materia" className="font-medium">
                  Materia
                </Label>
                <Select onValueChange={(value) => setValue("id_materia", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona la materia" />
                  </SelectTrigger>
                  <SelectContent>
                    {materias.map(({ id_materia, nombre_materia }) => <SelectItem key={`${id_materia}`} value={String(id_materia)} >{nombre_materia}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.id_materia && <p className="text-sm text-red-600 dark:text-red-400">{errors.id_materia.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="seccion" className="font-medium">
                  Sección
                </Label>
                <Select onValueChange={(value) => setValue("id_seccion", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona la sección" />
                  </SelectTrigger>
                  <SelectContent>

                    {secciones.map(({ id, nombre }) => <SelectItem key={`seccion ${id}`} value={String(id)} >Sección {nombre}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.id_seccion && <p className="text-sm text-red-600 dark:text-red-400">{errors.id_seccion.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="periodo_escolar" className="font-medium">
                  Período Escolar
                </Label>
                <Select onValueChange={(value) => setValue("id_periodo_escolar", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona el período" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodos_escolares.map(({ nombre, id_periodo_escolar }) => <SelectItem key={`${id_periodo_escolar}`} value={String(id_periodo_escolar)} >{nombre}</SelectItem>)}

                  </SelectContent>
                </Select>
                {errors.id_periodo_escolar && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.id_periodo_escolar.message}</p>
                )}
              </div>

              <div className="space-y-2 ">
                <Label htmlFor="ano" className="font-medium">
                  Año Escolar
                </Label>
                <Select onValueChange={(value) => setValue("id_ano", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona el año escolar" />
                  </SelectTrigger>
                  <SelectContent>
                    {anos.map(({ id, nombre }) => <SelectItem key={`año ${id}`} value={String(id)} >{nombre}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.id_ano && <p className="text-sm text-red-600 dark:text-red-400">{errors.id_ano.message}</p>}
              </div>

              <div className="space-y-2 ">
                <Label htmlFor="id_tipo_evaluacion" className="font-medium">
                  Tipo evaluacion
                </Label>
                <Select onValueChange={(value) => setValue("id_tipo_evaluacion", value)}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona el año escolar" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposEvaluaciones.map(({ id_tipo_evaluacion, nombre }) => <SelectItem key={`${id_tipo_evaluacion}`} value={String(id_tipo_evaluacion)} >{nombre}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.id_tipo_evaluacion && <p className="text-sm text-red-600 dark:text-red-400">{errors.id_tipo_evaluacion.message}</p>}
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
