import { sql } from "@/lib/db";
import { TipoEvaluacion } from "@/types/types.d";
export class TiposEvaluaciones {
  static async getTiposEvaluaciones(): Promise<TipoEvaluacion[]> {
    const query = `SELECT * FROM tipos_de_evaluacion`;

    try {
      const data = (await sql.query(query)) as TipoEvaluacion[];

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
