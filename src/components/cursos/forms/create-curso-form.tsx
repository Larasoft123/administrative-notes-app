"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PeriodoEscolar, AñoData, SeccionData, Materia } from "@/types/types.d"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Docente } from "@/types/types.d"
import { toast } from "sonner"



export interface AcademicFormProps {
    materias: Materia[]
    docentes: Docente[]
    anos: AñoData[]
    secciones: SeccionData[]
    periodosEscolares: PeriodoEscolar[]


}

// Form validation schema
const formSchema = z.object({
    id_materia: z.string().min(1, "Materia es requerida"),
    id_docente: z.string().min(1, "Docente es requerido"),
    id_ano: z.string().min(1, "Año es requerido"),
    id_seccion: z.string().min(1, "Sección es requerida"),
    id_periodo_escolar: z.string().min(1, "Período escolar es requerido"),
})

export type AcademicFormData = z.infer<typeof formSchema>

export function CreateCurseForm({
    materias,
    docentes,
    anos,
    secciones,
    periodosEscolares,

}: AcademicFormProps) {
    const form = useForm<AcademicFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id_materia: "",
            id_docente: "",
            id_ano: "",
            id_seccion: "",
            id_periodo_escolar: "",
        },
    })

    const handleSubmit = async (data: AcademicFormData) => {
        const res = await fetch("/api/cursos", {
            method: "POST",
            body: JSON.stringify(data)
        })
        if (!res.ok) {
            toast.error("Error al crear el curso", {
                richColors: true,
                duration: 5000
            })
            throw new Error("Error al crear el curso")
        }
        toast.success("curso creado correctamente", {
            richColors: true,
            duration: 5000
        })
        form.reset()


    }

    return (
        <Card className="w-full ">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Registro Académico</CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                    Complete la información académica requerida
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 justify-items-center md:justify-items-start  gap-6 ">
                            <FormField
                                control={form.control}
                                name="id_materia"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel className="text-sm font-medium">Materia</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Seleccionar materia" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {materias.map(({ id_materia, nombre_materia }) => (
                                                    <SelectItem key={id_materia} value={id_materia.toString()}>
                                                        {nombre_materia}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-xs">Seleccione la materia correspondiente</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="id_docente"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Docente</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Seleccionar docente" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {docentes.map(({ apellidos, id_docente, nombres }) => (
                                                    <SelectItem key={id_docente} value={id_docente.toString()}>
                                                        {nombres} {apellidos}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-xs">Seleccione el docente asignado</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="id_ano"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Año Académico</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Seleccionar año" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {anos.map(({ nombre, id }) => (
                                                    <SelectItem key={id} value={id.toString()}>
                                                        {nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-xs">Seleccione el año académico</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="id_seccion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Sección</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Seleccionar sección" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {secciones.map(({ id, nombre }) => (
                                                    <SelectItem key={id} value={id.toString()}>
                                                        {nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-xs">Seleccione la sección correspondiente</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="id_periodo_escolar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Período Escolar</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Seleccionar período escolar" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {periodosEscolares.map(({ id_periodo_escolar, nombre }) => (
                                                    <SelectItem key={id_periodo_escolar} value={id_periodo_escolar.toString()}>
                                                        {nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="text-xs">Seleccione el período escolar activo</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="flex gap-4 pt-4">
                            <Button type="submit" className="flex-1" disabled={form.formState.isLoading}>
                                {form.formState.isLoading ? "Guardando..." : "Guardar Registro"}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => form.reset()}
                                disabled={form.formState.isLoading}
                            >
                                Limpiar
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
