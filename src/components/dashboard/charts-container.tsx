import { PerformanceCharts } from "@/components/dashboard/performance-charts"

import {getSessionServer} from "@/utils/session"


async function getSectionsPerformance({userId,role}: {userId:number,role:string}): Promise<Error | any[]> {
    const res = await fetch(`http://localhost:3000/api/secciones?performance=true&userId=${userId}&role=${role}`, {
        credentials: "include"
    })

    
    
    if (!res.ok) {
        return new Error('Failed to fetch data')
    }
    const json = await res.json()


    return json
    
}


export async function ChartsContainer() {
    const session = await getSessionServer()
    if (!session) {
        return <div>No se ha iniciado sesión</div>
    }
    const {user} = session
   
    

    const sectionsPerformance = await getSectionsPerformance({role:user.role,userId:user.id})

    if (sectionsPerformance instanceof Error) {
        return <div>Error al obtener los datos</div>
    }
 


  return (
    <PerformanceCharts sectionsPerformance={sectionsPerformance}/>
  )
}
