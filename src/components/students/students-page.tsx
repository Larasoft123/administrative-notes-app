"use client"

import { useState, useMemo } from "react"
import { StudentsHeader } from "@/components/students/students-header"
import { StudentsFilters } from "@/components/students/students-filters"
import { StudentsGrid } from "@/components/students/students-grid"
import type { Student, StudentFilters } from "./types"

// Mock data
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ana García Rodríguez",
    year: "3°",
    section: "A",
    email: "ana.garcia@escuela.edu",
    phone: "+1234567890",
    status: "active",
    average: 8.7,
    grades: [
      { subject: "Matemáticas", score: 9, maxScore: 10, date: "2024-01-15", type: "exam" },
      { subject: "Ciencias", score: 8, maxScore: 10, date: "2024-01-12", type: "homework" },
      { subject: "Historia", score: 9, maxScore: 10, date: "2024-01-10", type: "project" },
      { subject: "Literatura", score: 8, maxScore: 10, date: "2024-01-08", type: "quiz" },
      { subject: "Inglés", score: 9, maxScore: 10, date: "2024-01-05", type: "exam" },
    ],
  },
  {
    id: "2",
    name: "Carlos López Martín",
    year: "2°",
    section: "B",
    email: "carlos.lopez@escuela.edu",
    status: "active",
    average: 7.4,
    grades: [
      { subject: "Matemáticas", score: 7, maxScore: 10, date: "2024-01-15", type: "exam" },
      { subject: "Ciencias", score: 8, maxScore: 10, date: "2024-01-12", type: "homework" },
      { subject: "Historia", score: 7, maxScore: 10, date: "2024-01-10", type: "project" },
      { subject: "Literatura", score: 7, maxScore: 10, date: "2024-01-08", type: "quiz" },
    ],
  },
  {
    id: "3",
    name: "María Rodríguez Sánchez",
    year: "1°",
    section: "A",
    email: "maria.rodriguez@escuela.edu",
    phone: "+1234567891",
    status: "inactive",
    average: 9.2,
    grades: [
      { subject: "Matemáticas", score: 10, maxScore: 10, date: "2024-01-15", type: "exam" },
      { subject: "Ciencias", score: 9, maxScore: 10, date: "2024-01-12", type: "homework" },
      { subject: "Historia", score: 9, maxScore: 10, date: "2024-01-10", type: "project" },
      { subject: "Literatura", score: 9, maxScore: 10, date: "2024-01-08", type: "quiz" },
      { subject: "Inglés", score: 9, maxScore: 10, date: "2024-01-05", type: "exam" },
    ],
  },
  {
    id: "4",
    name: "José Martínez González",
    year: "4°",
    section: "A",
    email: "jose.martinez@escuela.edu",
    status: "active",
    average: 6.8,
    grades: [
      { subject: "Matemáticas", score: 6, maxScore: 10, date: "2024-01-15", type: "exam" },
      { subject: "Ciencias", score: 7, maxScore: 10, date: "2024-01-12", type: "homework" },
      { subject: "Historia", score: 7, maxScore: 10, date: "2024-01-10", type: "project" },
      { subject: "Literatura", score: 7, maxScore: 10, date: "2024-01-08", type: "quiz" },
    ],
  },
  {
    id: "5",
    name: "Laura Sánchez Pérez",
    year: "3°",
    section: "B",
    email: "laura.sanchez@escuela.edu",
    phone: "+1234567892",
    status: "active",
    average: 8.9,
    grades: [
      { subject: "Matemáticas", score: 9, maxScore: 10, date: "2024-01-15", type: "exam" },
      { subject: "Ciencias", score: 9, maxScore: 10, date: "2024-01-12", type: "homework" },
      { subject: "Historia", score: 9, maxScore: 10, date: "2024-01-10", type: "project" },
      { subject: "Literatura", score: 8, maxScore: 10, date: "2024-01-08", type: "quiz" },
      { subject: "Inglés", score: 9, maxScore: 10, date: "2024-01-05", type: "exam" },
    ],
  },
  {
    id: "6",
    name: "Diego Fernández Ruiz",
    year: "2°",
    section: "A",
    email: "diego.fernandez@escuela.edu",
    status: "active",
    average: 7.8,
    grades: [
      { subject: "Matemáticas", score: 8, maxScore: 10, date: "2024-01-15", type: "exam" },
      { subject: "Ciencias", score: 8, maxScore: 10, date: "2024-01-12", type: "homework" },
      { subject: "Historia", score: 7, maxScore: 10, date: "2024-01-10", type: "project" },
      { subject: "Literatura", score: 8, maxScore: 10, date: "2024-01-08", type: "quiz" },
    ],
  },
]

export function StudentsPage() {
  const [filters, setFilters] = useState<StudentFilters>({})

  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      if (filters.search && !student.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      if (filters.year && student.year !== filters.year) {
        return false
      }
      if (filters.section && student.section !== filters.section) {
        return false
      }
      if (filters.status && student.status !== filters.status) {
        return false
      }
      return true
    })
  }, [filters])

  const handleViewDetails = (student: Student) => {
    console.log("Ver detalles de:", student.name)
    // Aquí podrías abrir un modal o navegar a una página de detalles
  }

  const handleAddStudent = () => {
    console.log("Agregar nuevo estudiante")
    // Aquí podrías abrir un modal o navegar a un formulario
  }

  const handleExport = () => {
    console.log("Exportar estudiantes")
    // Aquí podrías generar un CSV o PDF
  }

  const handleImport = () => {
    console.log("Importar estudiantes")
    // Aquí podrías abrir un modal para subir archivo
  }

  return (
    <div className="space-y-6">
      <StudentsHeader
        onAddStudent={handleAddStudent}
        onExport={handleExport}
        onImport={handleImport}
      />
      
      <StudentsFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalStudents={mockStudents.length}
        filteredCount={filteredStudents.length}
      />
      
      <StudentsGrid
        students={filteredStudents}
        onViewDetails={handleViewDetails}
      />
    </div>
  )
}
