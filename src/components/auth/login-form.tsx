"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { FormEvent, useState } from "react"
import {signIn} from "next-auth/react"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }


  const  handleSubmit= async (e: FormEvent) => {
    e.preventDefault()
    console.log("login");
    const email= "moises@gmail.com"
    const password="123456"
    
    await signIn("credentials",{
      redirect:false,
      email,
      password
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form className="w-full max-w-xl" onSubmit={handleSubmit}>
      <Card className="w-full  shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Correo Electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-4 h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-300">
                Recordarme
              </Label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-6">
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
          >
            Iniciar Sesión
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            ¿No tienes una cuenta?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Regístrate aquí
            </a>
          </p>
        </CardFooter>
      </Card>
      </form>
    </div>
  )
}
