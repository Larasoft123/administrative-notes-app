export interface Student {
  id: string
  nombres: string
  apellidos: string
  avatar?: string
  ano: string
  seccion: string
  detalle_materias: Grade[]
  promedio_general: number
  status: "activo" | "inactivo"
 
 
}

export interface Grade {
  subject: string
  average: number,
  notes: number[]
  date?: string
  type?: string
}

export interface StudentFilters {
  page: number
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

