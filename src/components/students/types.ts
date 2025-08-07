export interface Student {
  id: string
  name: string
  avatar?: string
  year: string
  section: string
  grades: Grade[]
  average: number
  status: "active" | "inactive"
  email: string
  phone?: string
}

export interface Grade {
  subject: string
  score: number
  maxScore: number
  date: string
  type: "exam" | "homework" | "project" | "quiz"
}

export interface StudentFilters {
  year?: string
  section?: string
  status?: string
  search?: string
}
