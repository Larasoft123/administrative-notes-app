export interface User {
  user_id: number;
  email: string;
  rol: "Docente" | "Admin";
  created_at: Date;
  hashed_password?: string;
}


interface Evaluation {
  id_evaluacion: number
  nombre_evaluacion: string
  descripcion_evaluacion: string
  nombre_ano : string
  nombre_seccion : string
  tipo_evaluacion : string
  finished: boolean

}

export interface TipoEvaluacion {
  id_tipo_evaluacion: number;
  nombre: string
}

export interface EvaluacionFormData {
  nombre: string;
  descripcion_evaluacion: string;
  id_materia: number;
  id_ano: number;
  id_seccion: number;
  id_periodo_escolar: number;
  id_lapso: number;
  id_tipo_evaluacion: number;
}



export interface Materia {
  id_materia: number;
  nombre_materia: string
}


export interface EvaluationCreateData {
  id_lapso: number;
  id_tipo_evaluacion: number;
  nombre: string;
  descripcion_evaluacion: string;
  id_curso: number
}

export interface CurseFormData {
  id_materia: number;
  id_docente: number;
  id_ano: number;
  id_seccion: number;
  id_periodo_escolar: number;
}

export interface PeriodoEscolar {
  id_periodo_escolar: number
  nombre: string,
  fecha_inicio: Date,
  fecha_fin: Date,
  activo: boolean
}

export interface Student {
  id: string
  nombres: string
  apellidos: string
  avatar?: string
  ano: string
  seccion: string
  detalle_materias: Grade[] | string
  promedio_general: number
  status: "activo" | "inactivo"


}

export interface Grade {
  subject: string
  average: number,
  notes: number[]
  date?: string
  type?: "exam" | "homework" | "project" | "quiz"
}

export interface StudentFilters {
  year?: string
  section?: string
  status?: string
  search?: string
  años?: AñoData[]
  secciones?: SeccionData[]
}


export interface AñoData {
  nombre: string;
  id: number;
}

export interface SeccionData {
  nombre: string;
  id: number;
}


export interface LapsoData {
  id: number;
  nombre: string;
}
