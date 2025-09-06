import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, GraduationCap, BookOpen, Calendar, Users, Edit, Trash2 } from "lucide-react"
import { Teacher } from "@/types/types.d"

interface TeacherCardProps {
    teacher: Teacher
    className?: string
}

export function DocentesCard({ teacher, className }: TeacherCardProps) {
    const fullName = `${teacher.nombres} ${teacher.apellidos}`;

    const initials = `${teacher.nombres.charAt(0)}${teacher.apellidos.charAt(0)}`

    const subjectsAccordionValue = `${teacher.cedula}-subjects`
    const coursesAccordionValue = `${teacher.cedula}-courses`

    return (
        <Card className={`w-full max-w-2xl mx-auto bg-card border-border shadow-lg ${className}`}>
            <CardHeader className="pb-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                            <AvatarImage src={"/placeholder.svg"} alt={fullName} />
                            <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">{initials}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2 min-w-0">
                            <div>
                                <h2 className="text-2xl font-bold text-card-foreground text-balance">{fullName}</h2>
                                {/* {teacher.position && <p className="text-muted-foreground font-medium">{teacher.position}</p>}
                                {teacher.department && (
                                    <Badge variant="secondary" className="mt-1">
                                        {teacher.department}
                                    </Badge>
                                )} */}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    <span className="truncate">{teacher.telefono}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    <span className="truncate">{teacher.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden 2xl:block">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
                                <Mail className="h-4 w-4 mr-2" />
                                Contactar
                            </Button>
                        </div>
                    </div>

                    <div className="2xl:hidden">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Mail className="h-4 w-4 mr-2" />
                            Contactar
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">


                    <DocentesCardBox qty={teacher.materias_impartidas.length} text="Materias" />
                    <DocentesCardBox qty={teacher.cursos.length} text="Cursos" />
                    <DocentesCardBox qty={teacher.numero_estudiantes_a_cargo} text="estudiantes" />
                    <DocentesCardBox qty={teacher.anos_impartidos.length} text="años" />
                    <DocentesCardBox qty={teacher.secciones_impartidas.length} text="Secciones" />
                </div>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={subjectsAccordionValue} className="border-border">
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                <span className="font-semibold">Materias que Imparte</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 pt-2">
                                {teacher.materias_impartidas.map(({ id_materia, nombre_materia }) => (
                                    <div key={`${teacher.id_docente, id_materia}`} className="p-3 bg-muted/20 rounded-lg border border-border/50">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-card-foreground">{nombre_materia}</h4>
                                                {/* {subject.description && (
                                                    <p className="text-sm text-muted-foreground mt-1">{subject.description}</p>
                                                )} */}
                                            </div>
                                            {/* <Badge variant="outline" className="ml-2">
                                                {subject.level}
                                            </Badge> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value={coursesAccordionValue} className="border-border">
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                <span className="font-semibold">Cursos Asignados</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 pt-2">
                                {teacher.cursos.map(({ id_curso, nombre_ano, nombre_materia, nombre_periodo, nombre_seccion }) => (
                                    <div key={id_curso} className="p-4 bg-muted/20 rounded-lg border border-border/50">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-card-foreground text-lg">{nombre_materia}</h4>
                                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>
                                                            Año {nombre_ano} - Sección {nombre_seccion}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        {/* <span>{course.students} estudiantes</span> */}
                                                    </div>
                                                    {/* {course.classroom && (
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="h-4 w-4" />
                                                            <span>{course.classroom}</span>
                                                        </div>
                                                    )} */}
                                                </div>
                                                {/* {course.schedule && (
                                                    <div className="mt-2">
                                                        <Badge variant="secondary">{course.schedule}</Badge>
                                                    </div>
                                                )} */}
                                            </div>
                                            <Badge className="bg-primary/10 text-primary border-primary/20">{nombre_periodo}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                    <Button variant="outline" className="flex-1 hover:bg-muted bg-transparent">
                        <Edit className="h-4 w-4 mr-2" />
                        Modificar Información
                    </Button>
                    <Button variant="destructive" className="flex-1">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar Profesor
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}



function DocentesCardBox({ text, qty }: { text: string, qty: number }) {
    return <div className="text-center">
        <div className="text-2xl font-bold text-primary">{qty}</div>
        <div className="text-sm text-muted-foreground">{text}</div>
    </div>
}
