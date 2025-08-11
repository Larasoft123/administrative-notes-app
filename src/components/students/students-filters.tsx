"use client"
import { Input } from "@/components/ui/input"
import {useDebouncedCallback} from "use-debounce"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, } from 'lucide-react'
import type { StudentFilters } from "@/types/types.d"
import { usePathname, useRouter, useSearchParams } from "next/navigation"






export function StudentsFilters({ años, secciones }: StudentFilters) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();




  const handleSelectChange = ({ value, name }: { value?: string, name: string }) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "todos") {
      params.set(name, value)
    } else {
      params.delete(name)
    }
    router.replace(`${pathname}?${params.toString()}`);
  }




  const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const { value } = e.target;
    console.log(value );
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    router.replace(`${pathname}?${params.toString()}`);
  },500);








  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input

            placeholder="Buscar estudiantes por nombre..."
            defaultValue={searchParams.get("search")?.toString()}
            onChange={handleChange}
            className="pl-10"
          />
        </div>

        {/* Filters row */}
        <div className="grid grid-cols-3 sm:justify-start justify-center gap-2 sm:flex sm:gap-2">

          <Select
            defaultValue={searchParams.get("year")?.toString()}
            onValueChange={(value) => handleSelectChange({ name: "year", value })}
          >
            <SelectTrigger className="text-xs sm:text-sm justify-self-center sm:w-32">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {años?.map((({ id, nombre }) => (<SelectItem key={id} value={nombre} >{nombre} </SelectItem>)))}
            </SelectContent>
          </Select>

          <Select
            defaultValue={searchParams.get("section")?.toString()}

            onValueChange={(value) => handleSelectChange({ name: "section", value })}
          >
            <SelectTrigger className="text-xs justify-self-center sm:text-sm sm:w-32">
              <SelectValue placeholder="Sección" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas</SelectItem>
              {secciones?.map((({ id, nombre }) => (<SelectItem key={id} value={nombre} >{nombre} </SelectItem>)))}
            </SelectContent>
          </Select>

          <Select
            defaultValue={searchParams.get("status")?.toString() || "activo"}
            onValueChange={(value) => handleSelectChange({ name: "status", value })}
          >
            <SelectTrigger className="text-xs justify-self-center sm:text-sm sm:w-32">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="activo">Activos</SelectItem>
              <SelectItem value="inactivo">Inactivos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters and Results */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="text-xs sm:text-sm text-gray-500">
          de  estudiantes
        </div>
      </div>
    </div>
  )
}
