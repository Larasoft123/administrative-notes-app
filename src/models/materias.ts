

import { sql } from "@/lib/db";



export class Materias {
   static async getSubjects({role,userId}: {role:"Admin" | "Docente",userId: number}){
        const query = `SELECT DISTINCT(m.id_materia),m.nombre_materia FROM materias m
        JOIN cursos c
        ON m.id_materia=c.id_materia 
        WHERE c.id_docente=$2 OR $1='Admin'
        ORDER BY m.nombre_materia

        `
        const params = [role,userId]

        try {
            
        const materias = await sql.query(query,params)
      
        
        return materias
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener las materias");
            
        }

    }
}







