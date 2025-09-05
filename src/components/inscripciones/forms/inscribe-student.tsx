"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2, Calendar, GraduationCap } from "lucide-react"
import { AñoData, SeccionData, PeriodoEscolar } from "@/types/types.d"
import { useState } from "react"
import { convertObjectDataToNumber } from "@/utils/convert"


const evaluationSchema = z.object({
    id_estudiante: z.string().min(1, "Selecciona un estudiante"),
    id_seccion: z.string().min(1, "Selecciona una sección"),
    id_periodo_escolar: z.string().min(1, "Selecciona un período escolar"),
    id_ano: z.string().min(1, "Selecciona un año"),
})








type EvaluationFormData = z.infer<typeof evaluationSchema>

export function InscribeStudentForm({ anos, secciones, periodos, students }: { students: any[], anos: AñoData[], secciones: SeccionData[], periodos: PeriodoEscolar[] }) {
    const {
        handleSubmit,
        setValue,
        reset,

        formState: { errors, isSubmitting },
    } = useForm<EvaluationFormData>({
        resolver: zodResolver(evaluationSchema),
        defaultValues: {

        },
    })

    const [message, setMessage] = useState<string | null>(null)



    const onSubmit = async (data: EvaluationFormData) => {
        const newData = convertObjectDataToNumber(data)






        try {
            const res = await fetch("/api/inscripciones", {
                method: "POST",
                body: JSON.stringify(newData)
            })
            if (!res.ok) {
                throw new Error("Error al inscribir al estudiante")
                setMessage("Error al inscribir al estudiante")
            }

            const json = await res.json()
            if (Array.isArray(json)) {
                setMessage("Estudiante inscrito correctamente")
            }






            reset()
        } catch (error) {
            setMessage("Error al inscribir al estudiante")
            console.log(error);

        }
    }

    return (
        <Card className="shadow-xl border-0 backdrop-blur-sm dark:backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Formulario de inscripcion
                    </CardTitle>
                </div>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                    Completa todos los campos para inscribir a un alumno
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Inscribe un estudiante</h3>
                        </div>

                        <div className="grid grid-cols-1 justify-center md:grid-cols-2 gap-4">


                            <div className="space-y-2">
                                <Label htmlFor="estudiante" className="font-medium">
                                    Estudiante
                                </Label>
                                <Select onValueChange={(value) => setValue("id_estudiante", value)} >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Selecciona el estudiante" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {students.map(({ id_estudiante, nombre_completo }) => <SelectItem key={`${id_estudiante}`} value={String(id_estudiante)}>{nombre_completo}</SelectItem>)}
                                    </SelectContent>
                                </Select>

                                {errors.id_estudiante && <p className="text-sm text-red-600 dark:text-red-400">{errors.id_estudiante.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="seccion" className="font-medium">
                                    Sección
                                </Label>
                                <Select onValueChange={(value) => setValue("id_seccion", value)} >
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
                                <Select onValueChange={(value) => setValue("id_periodo_escolar", value)} >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Selecciona el período" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {periodos.map(({ activo, nombre, id_periodo_escolar }) => <SelectItem key={`${id_periodo_escolar}`} value={String(id_periodo_escolar)} >{nombre}</SelectItem>)}
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
                        </div>


                        {message && <div className=" w-full flex justify-center ">
                            <span className="text-sm ">{message}</span>
                        </div>}

                    </div>

                    <div className="flex gap-3 pt-6">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-blue-600 disabled:bg-slate-200 disabled:pointer-events-none hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2.5"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Inscribiendo
                                </>
                            ) : (
                                "Inscribir estudiante"
                            )}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => reset()}
                            disabled={isSubmitting}
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
