import { CurseFormData } from "@/types/types.d";
import { sql } from "@/lib/db";

export class Cursos {
  static async getCursesOfTeacher({ id }: { id: number }) {
    const query = `SELECT
    -- Seleccionamos la información del curso, año, sección y período escolar.
    m.nombre_materia AS materia,
    a.nombre_ano AS ano,
    s.nombre_seccion AS seccion,
    pe.nombre AS periodo_escolar
FROM
    -- La tabla 'cursos' es el punto de partida, ya que vincula a todos los demás.
    cursos c
JOIN
    materias m ON c.id_materia = m.id_materia
JOIN
    anos a ON c.id_ano = a.id_ano
JOIN
    secciones s ON c.id_seccion = s.id_seccion
JOIN
    periodos_escolares pe ON c.id_periodo_escolar = pe.id_periodo_escolar
WHERE
    -- ** Filtramos por el ID del docente que deseas consultar. **
    -- Reemplaza '[id_del_docente]' con el ID real.
    c.id_docente = $1
ORDER BY
    -- Ordenamos los resultados para una mejor lectura.
    pe.nombre DESC,
    a.nombre_ano,
    s.nombre_seccion,
    m.nombre_materia;

    `;
    const params = [id];

    try {
      const cursos = await sql.query(query, params);
      return cursos;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los cursos");
    }
  }

  static async createCurse({
    id_ano,
    id_docente,
    id_materia,
    id_periodo_escolar,
    id_seccion,
  }: CurseFormData) {
    const query = `INSERT INTO cursos(id_materia,id_docente,id_ano,id_seccion,id_periodo_escolar) VALUES($1,$2,$3,$4,$5)`;

    const params = [
      id_materia,
      id_docente,
      id_ano,
      id_seccion,
      id_periodo_escolar,
    ];

    try {
      const curso = await sql.query(query, params);
      return curso;
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el curso");
    }
  }

  static async getCurse({
    id_periodo_escolar,
    id_materia,
    id_seccion,
    id_ano,
  }: {
    id_periodo_escolar: number;
    id_materia: number;
    id_seccion: number;
    id_ano: number;
  }) {
    const query = `SELECT * FROM cursos WHERE id_periodo_escolar=$1 AND id_materia=$2 AND id_seccion=$3 AND id_ano=$4`;
    const params = [id_periodo_escolar, id_materia, id_seccion, id_ano];

    try {
      const curso = await sql.query(query, params);
 
      
      return curso;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el curso");
    }


  }
}
