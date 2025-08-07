import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, X } from 'lucide-react'
import type { StudentFilters } from "./types"

interface StudentsFiltersProps {
  filters: StudentFilters
  onFiltersChange: (filters: StudentFilters) => void
  totalStudents: number
  filteredCount: number
}

export function StudentsFilters({ filters, onFiltersChange, totalStudents, filteredCount }: StudentsFiltersProps) {
  const clearFilters = () => {
    onFiltersChange({})
  }

  const removeFilter = (key: keyof StudentFilters) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    onFiltersChange(newFilters)
  }

  const hasActiveFilters = Object.keys(filters).length > 0

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar estudiantes por nombre..."
            value={filters.search || ""}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
        
        {/* Filters row */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-2">
          <Select 
            value={filters.year || "all"} 
            onValueChange={(value) => onFiltersChange({ ...filters, year: value === "all" ? undefined : value })}
          >
            <SelectTrigger className="text-xs sm:text-sm sm:w-32">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="1°">1° Año</SelectItem>
              <SelectItem value="2°">2° Año</SelectItem>
              <SelectItem value="3°">3° Año</SelectItem>
              <SelectItem value="4°">4° Año</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.section || "all"} 
            onValueChange={(value) => onFiltersChange({ ...filters, section: value === "all" ? undefined : value })}
          >
            <SelectTrigger className="text-xs sm:text-sm sm:w-32">
              <SelectValue placeholder="Sección" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="A">Sección A</SelectItem>
              <SelectItem value="B">Sección B</SelectItem>
              <SelectItem value="C">Sección C</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.status || "all"} 
            onValueChange={(value) => onFiltersChange({ ...filters, status: value === "all" ? undefined : value })}
          >
            <SelectTrigger className="text-xs sm:text-sm sm:w-32">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters and Results */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-wrap items-center gap-2">
          {hasActiveFilters && (
            <>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Filtros:</span>
              </div>
              {filters.search && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {filters.search}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("search")} />
                </Badge>
              )}
              {filters.year && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {filters.year}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("year")} />
                </Badge>
              )}
              {filters.section && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  Sec. {filters.section}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("section")} />
                </Badge>
              )}
              {filters.status && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {filters.status === "active" ? "Activos" : "Inactivos"}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("status")} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                Limpiar
              </Button>
            </>
          )}
        </div>
        <div className="text-xs sm:text-sm text-gray-500">
          {filteredCount} de {totalStudents} estudiantes
        </div>
      </div>
    </div>
  )
}
