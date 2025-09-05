

import { getSessionServer } from "@/utils/session"
import { CursosHeader } from "@/components/cursos/cursos-header"



export async function CursosPage({ }: {}) {


  const session = await getSessionServer()

  if (!session) {
    return <div>No se ha iniciado sesión</div>
  }


















  return (
    <section className="space-y-6">
      <CursosHeader />





    </section>
  )
}
