"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  Calendar,
  Mail,
  ShoppingCart,
  Folder,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigation = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/",
    current: true,
  },
  {
    name: "mis-materias",
    icon: BarChart3,
    href: "/mis-materias",
    current: false,
  },
  {
    name: "estudiantes",
    icon: Users,
    href: "/estudiantes",
    current: false,
  },
  {
    name: "Pedidos",
    icon: ShoppingCart,
    href: "#",
    current: false,
  },
  {
    name: "Documentos",
    icon: FileText,
    href: "#",
    current: false,
  },
  {
    name: "Calendario",
    icon: Calendar,
    href: "#",
    current: false,
  },
  {
    name: "Mensajes",
    icon: Mail,
    href: "#",
    current: false,
  },
  {
    name: "Proyectos",
    icon: Folder,
    href: "#",
    current: false,
  },
]

const secondaryNavigation = [
  {
    name: "Configuración",
    icon: Settings,
    href: "#",
  },
  {
    name: "Ayuda",
    icon: HelpCircle,
    href: "#",
  },
]

export function Sidebar() {
  const pathName = usePathname()

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold text-gray-900 dark:text-white">Navegación</h2>
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathName === item.href
                return (
                  <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-10",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    )}
                   
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="px-3 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold text-gray-900 dark:text-white">Otros</h2>
            <div className="space-y-1">
              {secondaryNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.name} href={item.href}>
                    <Button

                      variant="ghost"
                      className="w-full cursor-pointer justify-start h-10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >

                      <Icon className="mr-3 h-4 w-4" />
                      {item.name}

                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
