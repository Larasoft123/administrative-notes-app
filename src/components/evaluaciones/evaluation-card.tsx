import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Calendar, Users, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Evaluation } from "@/types/types.d"


interface EvaluationCardProps {
    evaluation: Evaluation
    className?: string
}

export function EvaluationCard({ evaluation, className }: EvaluationCardProps) {
    const { finished = false, descripcion_evaluacion, nombre_ano, nombre_evaluacion, nombre_seccion, tipo_evaluacion } =
        evaluation


    return (
        <div className={cn("group relative animated-border rounded-lg", className)}>
            <Card className="relative bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg font-semibold text-balance leading-tight">{nombre_evaluacion}</CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge
                                    variant={finished ? "default" : "secondary"}
                                    className={cn(
                                        "text-xs font-medium",
                                        finished
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
                                    )}
                                >
                                    {finished ? (
                                        <>
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Finalizada
                                        </>
                                    ) : (
                                        <>
                                            <Clock className="w-3 h-3 mr-1" />
                                            En progreso
                                        </>
                                    )}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    <FileText className="w-3 h-3 mr-1" />
                                    {tipo_evaluacion}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">afsddsaf</p>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Año</p>
                                <p className="text-sm font-medium truncate">{nombre_ano} </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                            <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div className="min-w-0">
                                <p className="text-xs text-muted-foreground">Sección</p>
                                <p className="text-sm font-medium truncate">{nombre_seccion} </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
