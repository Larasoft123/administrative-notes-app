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

export interface Docente {
  id_docente: number
  nombres: string
  apellidos: string
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


export interface StudentFormData {
  cedula?: string | null;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  direccion?: string | null;
  inscribirlo: boolean;
  ano?: number;
  seccion?: number;
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

interface studentFilters {
  page?: number
  name: string;
  año: string;
  seccion: string;
  periodos_escolares: string;
  status: statusOptions;
}
export interface PeriodoEscolar {
  id_periodo_escolar: number
  nombre: string,
  fecha_inicio: Date,
  fecha_fin: Date,
  activo: boolean
}

export interface PeriodoEscolarFormData {
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
}

export interface StudentFilters {
  year?: string
  section?: string
  status?: string
  search?: string
  periodos_escolares?: PeriodoEscolar[]
  page: number
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

export interface Curso {
    id_curso: string
    nombre_ano: string
    nombre_materia: number
    nombre_periodo: string
    nombre_seccion: string
}

export interface Teacher {
    id_docente: number
    cedula: string
    nombres: string
    apellidos: string
    telefono: string
    email: string
    materias_impartidas: Materia[]
    cursos: Curso[]
    periodos_escolares_impartidos: string[]
    anos_impartidos: string[]
    secciones_impartidas: string[]
    numero_estudiantes_a_cargo: number
}