

export async function getPromedioEstudiantes({role,year}: {role?: string, year?: string}) {
    const res = await fetch(`http://localhost:3000/api/notas?modifier=promedio`)
    if (!res.ok) {
        return new Error('Failed to fetch data')
    }
    const json = await res.json()

    console.log(json );
    
    return json.data
}




export async function getMedianaEstudiantes({role,year}: {role?: string, year?: string}) {
    const res = await fetch(`http://localhost:3000/api/notas?modifier=mediana`)
    if (!res.ok) {
        return new Error('Failed to fetch data')
    }
    const json = await res.json()

    return json.data
}




export async function getNotasEstudiantes({role,year}: {role?: string, year?: string}) {
    const res = await fetch(`http://localhost:3000/api/notas`)
    if (!res.ok) {
        return new Error('Failed to fetch data')
    }
    const json = await res.json()

    return json
}