"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, User, MapPin, CreditCard, Save, } from 'lucide-react'
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Form, FormField, FormControl, FormLabel, FormDescription, FormItem, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

interface StudentFormData {
    cedula: string | undefined
    nombre: string
    apellido: string
    fecha_nacimiento: Date
    direccion: string | undefined
    inscribirlo: boolean
}

export function CreateStudentForm({ }) {
    const form = useForm<StudentFormData>({
        defaultValues: {
            cedula: '',
            nombre: "",
            apellido: "",
            fecha_nacimiento: undefined,
            direccion: '',
            inscribirlo: false
        },
    })



    const calculateAge = (birthDate: Date): number => {
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1
        }
        return age
    }

    const handleFormSubmit = async (data: StudentFormData) => {

        const res = await fetch("/api/estudiantes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const json = await res.json()
        console.log({ res, json });


    }

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 46 }, (_, i) => currentYear - i)
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Card className="shadow-xl border border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center pb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Nuevo Estudiante
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                        Completa la información para registrar un nuevo estudiante
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                            {/* Cédula */}
                            <FormField
                                control={form.control}
                                name="cedula"
                                rules={{
                                    minLength: {
                                        value: 6,
                                        message: "La cédula debe tener al menos 6 caracteres"
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "La cédula no puede exceder 15 caracteres"
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "La cédula solo debe contener números"
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center">
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            Cédula de Identidad
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ej: 12345678"
                                                className="h-12"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Nombre y Apellido */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="nombre"
                                    rules={{
                                        required: "El nombre es requerido",
                                        minLength: {
                                            value: 2,
                                            message: "El nombre debe tener al menos 2 caracteres"
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: "El nombre solo debe contener letras"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ej: Juan Carlos"
                                                    className="h-12"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="apellido"
                                    rules={{
                                        required: "El apellido es requerido",
                                        minLength: {
                                            value: 2,
                                            message: "El apellido debe tener al menos 2 caracteres"
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: "El apellido solo debe contener letras"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apellido</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ej: García López"
                                                    className="h-12"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Fecha de Nacimiento */}
                            <FormField
                                control={form.control}
                                name="fecha_nacimiento"
                                rules={{
                                    required: "La fecha de nacimiento es requerida",

                                    onChange: (event) => {
                                        const date = event.target.value as Date
                                        const now = new Date()
                                        if (date > new Date() || date < new Date("1980-01-01")) {
                                            form.setValue("fecha_nacimiento", now)
                                        }







                                    }

                                }}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="flex items-center">
                                            <CalendarIcon className="w-4 h-4 mr-2" />
                                            Fecha de Nacimiento
                                            {field.value && (
                                                <Badge variant="outline" className="ml-2 text-xs">
                                                    {calculateAge(field.value)} años
                                                </Badge>
                                            )}
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full h-12 pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP", { locale: es })
                                                        ) : (
                                                            <span>Selecciona una fecha</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <div className="p-3 border-b">
                                                    <div className="flex items-center justify-between space-x-2">
                                                        <Select
                                                            value={field.value ? field.value.getMonth().toString() : ""}
                                                            onValueChange={(month) => {
                                                                const currentDate = field.value || new Date()
                                                                const newDate = new Date(currentDate.getFullYear(), parseInt(month), currentDate.getDate())
                                                                field.onChange(newDate)
                                                            }}
                                                        >
                                                            <SelectTrigger className="w-32">
                                                                <SelectValue placeholder="Mes" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {months.map((month, index) => (
                                                                    <SelectItem key={index} value={index.toString()}>
                                                                        {month}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>

                                                        <Select
                                                            value={field.value ? field.value.getFullYear().toString() : ""}
                                                            onValueChange={(year) => {
                                                                const currentDate = field.value || new Date()
                                                                const newDate = new Date(parseInt(year), currentDate.getMonth(), currentDate.getDate())
                                                                field.onChange(newDate)
                                                            }}
                                                        >
                                                            <SelectTrigger className="w-20">
                                                                <SelectValue placeholder="Año" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {years.map((year) => (
                                                                    <SelectItem key={year} value={year.toString()}>
                                                                        {year}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1980-01-01")
                                                    }
                                                    month={field.value}
                                                    onMonthChange={(month) => {
                                                        if (month) {
                                                            field.onChange(month)
                                                        }
                                                    }}
                                                    locale={es}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Dirección */}
                            <FormField
                                control={form.control}
                                name="direccion"
                                rules={{

                                    maxLength: {
                                        value: 200,
                                        message: "La dirección no puede exceder 200 caracteres"
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            Dirección
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Ej: Av. Principal #123, Urbanización Los Jardines, Ciudad"
                                                className="min-h-[100px] resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {field.value?.length || 0}/200 caracteres
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="inscribirlo"
                                render={({ field }) => (
                                    <FormItem className="flex gap-4 items-center">

                                        <FormControl>


                                        <Checkbox
                                        
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        
                                        />
                                        </FormControl>
                                        <FormLabel className="text-sm">
                                            Inscribirlo en el periodo escolar activo?
                                        </FormLabel>
                                    </FormItem>
                                )}


                            />


                            {/* Botones */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                <Button
                                    type="submit"
                                    className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-200"
                                    disabled={form.formState.isSubmitting}
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {form.formState.isSubmitting ? "Creando..." : "Crear Estudiante"}
                                </Button>

                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
