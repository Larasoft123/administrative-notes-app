import { sql } from "@/lib/db";
import { PeriodoEscolarFormData } from "@/types/types.d";

export class PeriodosEscolares {
  static async getPeriodos() {
    const query = `SELECT * FROM periodos_escolares ORDER BY fecha_inicio DESC`;
    const result = await sql.query(query);;
    return result 
  }


  static async getActivePeriodo(){
    const query = `SELECT * FROM periodos_escolares WHERE activo = true`
    const result = await sql.query(query);;
    return result
  }

  static async createPeriodo({nombre,fecha_inicio,fecha_fin,activo}: PeriodoEscolarFormData){
    
    const query = `INSERT INTO periodos_escolares(nombre,fecha_inicio,fecha_fin,activo) VALUES($1,$2,$3,$4) RETURNING *`
    const params = [nombre,fecha_inicio,fecha_fin,activo]

    try {
        
        const result = await sql.query(query,params)
        return result
    } catch (error) {
        throw new Error("Error al crear el periodo escolar")
        
    }


  }
}
