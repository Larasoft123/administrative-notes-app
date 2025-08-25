import { sql } from "@/lib/db";
import { EvaluationCreateData } from "@/types/types.d";






export class Evaluaciones {
  static async getEvaluationsOfTeacher({
    id,
    search,
    year,
    section,
  }: {
    id: number;
    search: string;
    year: string;
    section: string;
  }) {
    const query = `SELECT e.id_evaluacion,e.nombre AS nombre_evaluacion,e.descripcion_evaluacion ,a.nombre_ano,s.nombre_seccion,te.nombre AS tipo_evaluacion
        FROM evaluaciones e 
        JOIN cursos c ON e.id_curso=c.id_curso 
        JOIN anos a ON c.id_ano=a.id_ano
        JOIN secciones s ON c.id_seccion=s.id_seccion
        JOIN periodos_escolares pe ON c.id_periodo_escolar=pe.id_periodo_escolar
        JOIN docentes d ON c.id_docente=d.id_docente 
        JOIN tipos_de_evaluacion te ON e.id_tipo_evaluacion=te.id_tipo_evaluacion
        WHERE d.id_docente=$1 AND pe.activo=TRUE  AND (a.nombre_ano=$2 OR $2='todos') AND (s.nombre_seccion=$3 OR $3='todos')`;
    const params = [id, year, section];

    try {
      const evaluations = await sql.query(query, params);
      return evaluations;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener las evaluaciones");
    }
  }

  static async createEvaluation( {descripcion_evaluacion,id_curso,id_lapso,id_tipo_evaluacion,nombre} :EvaluationCreateData) {
    const query = `INSERT INTO 
    evaluaciones(nombre,descripcion_evaluacion,id_curso,id_lapso,id_tipo_evaluacion)
    VALUES($1,$2,$3,$4,$5) RETURNING *;
    `
    const params = [nombre,descripcion_evaluacion,id_curso,id_lapso,id_tipo_evaluacion]


    try {
      
      const result = await sql.query(query,params)
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear la evaluacion");
      
    }
    
  }
}
