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
  secciones? : SeccionData[]
}


export interface AñoData {
  nombre: string;
  id: number;
}

export interface SeccionData {
  nombre: string;
  id: number;
}

