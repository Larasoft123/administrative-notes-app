



export async function getSubjects({role,userId}: {role:"Admin" | "Docente",userId: number}){
    try {
        const response = await fetch(`http://localhost:3000/api/materias?userId=${userId}&role=${role}`)
        const data = await response.json()
        return data
        
    } catch (error) {
        console.log(error );
        
        return []
        
    }
}