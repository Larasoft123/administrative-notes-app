import { sql } from "@/lib/db";
import { Docente } from "@/types/types.d";


const limit = 9
export class Docentes {
  static async getDocentes(): Promise<Docente[] | Error> {
    const query = `SELECT nombres,apellidos,id_docente FROM docentes ORDER BY nombres, apellidos`;
    try {
      const data = (await sql.query(query)) as Docente[];
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener los docentes");
    }
  }

  static async getDocentesFullInfo({
    teacherName = null,
    subjectName = null,
    yearName = null,
    sectionName = null,
    ActiveUser = null,
    periodoName = null,
    page
  }: {
    teacherName: string | null;
    subjectName: string | null;
    yearName: string | null;
    sectionName: string | null;
    ActiveUser: boolean | null;
    periodoName: string | null;
    page: number;
  }) {
    
    

    const offset = (page-1) * limit 

  


    const query = `
-- CTE 1: Agregamos todos los cursos, materias, años, secciones y periodos para cada docente
WITH docente_cursos_info AS (
    SELECT
        c.id_docente,
        -- Usamos JSONB_AGG para crear un arreglo de objetos JSON para cada curso
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
                'id_curso', c.id_curso,
                'nombre_materia', m.nombre_materia,
                'nombre_ano', a.nombre_ano,
                'nombre_seccion', s.nombre_seccion,
                'nombre_periodo', pe.nombre
            )
        ) AS cursos,
        -- Usamos ARRAY_AGG para obtener una lista simple de materias
        JSONB_AGG(
          DISTINCT(
            JSONB_BUILD_OBJECT(
                'id_materia', m.id_materia,
                'nombre_materia', m.nombre_materia
            )
        )
        ) AS materias_impartidas,
        -- Usamos ARRAY_AGG para obtener los años y secciones
        ARRAY_AGG(DISTINCT a.nombre_ano) AS anos_impartidos,
        ARRAY_AGG(DISTINCT s.nombre_seccion) AS secciones_impartidas,
        -- Obtenemos una lista de los periodos escolares en los que ha dado clases
        ARRAY_AGG(DISTINCT pe.nombre) AS periodos_escolares_impartidos
    FROM
        cursos c
    JOIN materias m ON c.id_materia = m.id_materia
    JOIN anos a ON c.id_ano = a.id_ano
    JOIN secciones s ON c.id_seccion = s.id_seccion
    JOIN periodos_escolares pe ON c.id_periodo_escolar = pe.id_periodo_escolar
    GROUP BY
        c.id_docente
        
),
-- CTE 2: Obtenemos el conteo de estudiantes para cada docente
docente_estudiantes_info AS (
    SELECT
        c.id_docente,
        -- Usamos COUNT(DISTINCT...) para obtener el número de estudiantes sin duplicados.
        COUNT(DISTINCT e.id_estudiante) AS numero_estudiantes
    FROM
        cursos c
    JOIN inscripciones i ON c.id_ano = i.id_ano AND c.id_seccion = i.id_seccion AND c.id_periodo_escolar = i.id_periodo_escolar
    JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
    GROUP BY
        c.id_docente
)
-- Consulta final: Unimos la información del docente con los CTEs
SELECT
    d.id_docente,
    d.nombres,
    d.apellidos,
    u.email,
    d.telefono,
    -- Usamos COALESCE para manejar el caso en que un docente no tenga cursos o estudiantes
    COALESCE(dci.cursos, '[]'::jsonb) AS cursos,
    COALESCE(dci.materias_impartidas, '[]'::jsonb) AS materias_impartidas,
    COALESCE(dci.anos_impartidos, '{}'::text[]) AS anos_impartidos,
    COALESCE(dci.secciones_impartidas, '{}'::text[]) AS secciones_impartidas,
    COALESCE(dci.periodos_escolares_impartidos, '{}'::text[]) AS periodos_escolares_impartidos,
    -- Usamos COALESCE para devolver 0 si no hay estudiantes
    COALESCE(dei.numero_estudiantes, 0) AS numero_estudiantes_a_cargo
FROM
    docentes d
JOIN usuarios u ON d.id_usuario = u.id_usuario
LEFT JOIN docente_cursos_info dci ON d.id_docente = dci.id_docente
LEFT JOIN docente_estudiantes_info dei ON d.id_docente = dei.id_docente
-- Cláusula WHERE con parámetros para filtrar los resultados
WHERE
    -- Filtro por nombre de docente (parámetro 1)
    (CAST($1 AS VARCHAR) IS NULL OR d.nombres ILIKE '%' || CAST($1 AS VARCHAR) || '%')
    -- Filtro por materia (parámetro 2)
      AND (CAST($2 AS VARCHAR) IS NULL OR dci.materias_impartidas @> JSONB_BUILD_ARRAY(JSONB_BUILD_OBJECT('nombre_materia', CAST($2 AS VARCHAR))))
    -- Filtro por año (parámetro 3)
    AND (CAST($3 AS VARCHAR) IS NULL OR dci.anos_impartidos @> ARRAY[CAST($3 AS VARCHAR)])
    -- Filtro por sección (parámetro 4)
    AND (CAST($4 AS VARCHAR) IS NULL OR dci.secciones_impartidas @> ARRAY[CAST($4 AS VARCHAR)])
    -- Filtro por estado de usuario activo (parámetro 5)
    AND (CAST($5 AS BOOLEAN) IS NULL OR u.activo = CAST($5 AS BOOLEAN))
    -- Filtro por periodo escolar (parámetro 6)
    AND (CAST($6 AS VARCHAR) IS NULL OR dci.periodos_escolares_impartidos @> ARRAY[CAST($6 AS VARCHAR)])
    ORDER BY
    d.apellidos, d.nombres
    LIMIT $7
    OFFSET $8;

`; 

    const params = [teacherName,subjectName,yearName,sectionName,ActiveUser,periodoName,limit,offset];
    try {
      const result = await sql.query(query,params);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los docentes");
    }
  }
}
