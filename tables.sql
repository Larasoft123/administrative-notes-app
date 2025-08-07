-- #############################################################
-- ##                BASES DE DATOS EDUCATIVA                 ##
-- ##                 SCRIPT PARA POSTGRESQL                  ##
-- #############################################################

-- Primero, creamos las tablas de catálogo que no dependen de otras.
-- v1
DROP TABLE IF EXISTS periodos_escolares;

DROP TABLE IF EXISTS anos;

DROP TABLE IF EXISTS secciones;

DROP TABLE IF EXISTS lapsos;

DROP TABLE IF EXISTS materias;

DROP TABLE IF EXISTS docentes;

DROP TABLE IF EXISTS estudiantes;

DROP TABLE IF EXISTS inscripciones;

DROP TABLE IF EXISTS cursos;

DROP TABLE IF EXISTS notas;

CREATE TABLE periodos_escolares (
    id_periodo_escolar SERIAL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE, -- ej: "2024-2025"
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    activo BOOLEAN DEFAULT true -- Para saber cuál es el período actual
);

CREATE TABLE anos (
    id_ano SERIAL PRIMARY KEY,
    nombre_ano VARCHAR(50) NOT NULL UNIQUE -- ej: "1er Ano", "5to Ano"
);

CREATE TABLE secciones (
    id_seccion SERIAL PRIMARY KEY,
    nombre_seccion VARCHAR(20) NOT NULL UNIQUE -- ej: "A", "B", "Única"
);

CREATE TABLE lapsos (
    id_lapso SERIAL PRIMARY KEY,
    nombre_lapso VARCHAR(50) NOT NULL UNIQUE -- ej: "Primer Lapso", "Segundo Lapso"
);

CREATE TABLE materias (
    id_materia SERIAL PRIMARY KEY,
    nombre_materia VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE docentes (
    id_docente SERIAL PRIMARY KEY NOT NULL UNIQUE,
    cedula VARCHAR(15) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20)
);

CREATE TABLE estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    cedula VARCHAR(15) UNIQUE, -- Puede ser NULL para estudiantes sin cédula aún
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    direccion TEXT
);

-- Ahora, creamos las tablas de relación que conectan las tablas anteriores.

CREATE TABLE inscripciones (
    id_inscripcion SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL REFERENCES estudiantes (id_estudiante) ON DELETE RESTRICT,
    id_ano INT NOT NULL REFERENCES anos (id_ano) ON DELETE RESTRICT,
    id_seccion INT NOT NULL REFERENCES secciones (id_seccion) ON DELETE RESTRICT,
    id_periodo_escolar INT NOT NULL REFERENCES periodos_escolares (id_periodo_escolar) ON DELETE RESTRICT,
    fecha_inscripcion DATE DEFAULT CURRENT_DATE,
    -- Un estudiante solo puede estar inscrito una vez por período escolar
    UNIQUE (
        id_estudiante,
        id_periodo_escolar
    )
);

CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    id_materia INT NOT NULL REFERENCES materias (id_materia) ON DELETE RESTRICT,
    id_docente INT NOT NULL REFERENCES docentes (id_docente) ON DELETE RESTRICT,
    id_ano INT NOT NULL REFERENCES anos (id_ano) ON DELETE RESTRICT,
    id_seccion INT NOT NULL REFERENCES secciones (id_seccion) ON DELETE RESTRICT,
    id_periodo_escolar INT NOT NULL REFERENCES periodos_escolares (id_periodo_escolar) ON DELETE RESTRICT,
    -- No debería existir el mismo curso duplicado en el mismo período
    UNIQUE (
        id_materia,
        id_ano,
        id_seccion,
        id_periodo_escolar
    )
);

CREATE TABLE notas (
    id_nota SERIAL PRIMARY KEY,
    id_inscripcion INT NOT NULL REFERENCES inscripciones (id_inscripcion) ON DELETE CASCADE, -- Si se elimina la inscripción, se van las notas
    id_curso INT NOT NULL REFERENCES cursos (id_curso) ON DELETE RESTRICT,
    id_lapso INT NOT NULL REFERENCES lapsos (id_lapso) ON DELETE RESTRICT,
    calificacion INT DEFAULT 0 CHECK (
        calificacion >= 0
        AND calificacion <= 20
    ),
    fecha_registro TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Creación de ÍNDICES para mejorar la velocidad de las consultas
CREATE INDEX idx_inscripciones_estudiante ON inscripciones (id_estudiante);

CREATE INDEX idx_cursos_docente ON cursos (id_docente);

CREATE INDEX idx_notas_inscripcion ON notas (id_inscripcion);

CREATE INDEX idx_notas_curso ON notas (id_curso);

-- v2

DROP TABLE IF EXISTS notas;

DROP TABLE IF EXISTS inscripciones;

DROP TABLE IF EXISTS cursos;

DROP TABLE IF EXISTS estudiantes;

DROP TABLE IF EXISTS lapsos;

DROP TABLE IF EXISTS materias;

DROP TABLE IF EXISTS docentes;
-- Drop docentes before usuarios as it has a FK to usuarios
DROP TABLE IF EXISTS usuario_roles;

DROP TABLE IF EXISTS roles;

DROP TABLE IF EXISTS usuarios;

DROP TABLE IF EXISTS secciones;

DROP TABLE IF EXISTS anos;

DROP TABLE IF EXISTS periodos_escolares;

-- Tabla para gestionar los períodos escolares (ej. 2023-2024)
CREATE TABLE periodos_escolares (
    id_periodo_escolar SERIAL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    activo BOOLEAN DEFAULT true -- Indica si el período escolar está actualmente activo
);

-- Tabla para los diferentes años académicos (ej. 1er Año, 2do Año)
CREATE TABLE anos (
    id_ano SERIAL PRIMARY KEY,
    nombre_ano VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla para las secciones (ej. Sección A, Sección B)
CREATE TABLE secciones (
    id_seccion SERIAL PRIMARY KEY,
    nombre_seccion VARCHAR(20) NOT NULL UNIQUE
);

-- Tabla para los lapsos de evaluación (ej. Primer Lapso, Segundo Lapso)
CREATE TABLE lapsos (
    id_lapso SERIAL PRIMARY KEY,
    nombre_lapso VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla para las materias (ej. Matemáticas, Lengua y Literatura)
CREATE TABLE materias (
    id_materia SERIAL PRIMARY KEY,
    nombre_materia VARCHAR(100) NOT NULL UNIQUE
);

-- Nueva tabla para todos los usuarios que pueden iniciar sesión
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE, -- Email para iniciar sesión
    contrasena_hash VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE, -- Para habilitar/deshabilitar usuarios
    fecha_creacion TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Nueva tabla para definir los roles del sistema
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE -- Ej: 'Administrador', 'Docente'
);

-- Nueva tabla de unión para asignar roles a los usuarios (un usuario puede tener múltiples roles)
CREATE TABLE usuario_roles (
    id_usuario_rol SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios (id_usuario) ON DELETE CASCADE,
    id_rol INT NOT NULL REFERENCES roles (id_rol) ON DELETE RESTRICT,
    UNIQUE (id_usuario, id_rol) -- Un usuario solo puede tener un rol específico una vez
);

-- Tabla para los docentes, ahora vinculada a la tabla de usuarios
CREATE TABLE docentes (
    id_docente SERIAL PRIMARY KEY,
    id_usuario INT UNIQUE REFERENCES usuarios (id_usuario) ON DELETE RESTRICT, -- Un docente es un usuario
    cedula VARCHAR(15) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20)
    -- email, contrasena_hash, y es_administrador se manejan en la tabla 'usuarios' y 'usuario_roles'
);

-- Tabla para los estudiantes (no inician sesión directamente)
CREATE TABLE estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    cedula VARCHAR(15) UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    direccion TEXT
);

-- Tabla para registrar la inscripción de un estudiante en un año y sección para un período escolar
CREATE TABLE inscripciones (
    id_inscripcion SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL REFERENCES estudiantes (id_estudiante) ON DELETE RESTRICT,
    id_ano INT NOT NULL REFERENCES anos (id_ano) ON DELETE RESTRICT,
    id_seccion INT NOT NULL REFERENCES secciones (id_seccion) ON DELETE RESTRICT,
    id_periodo_escolar INT NOT NULL REFERENCES periodos_escolares (id_periodo_escolar) ON DELETE RESTRICT,
    fecha_inscripcion DATE DEFAULT CURRENT_DATE,
    UNIQUE (
        id_estudiante,
        id_periodo_escolar
    ) -- Un estudiante solo puede inscribirse una vez por período escolar
);

-- Tabla para definir las instancias de cursos (ej. Matemáticas de 3er Año, Sección A, impartida por Docente X)
CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    id_materia INT NOT NULL REFERENCES materias (id_materia) ON DELETE RESTRICT,
    id_docente INT NOT NULL REFERENCES docentes (id_docente) ON DELETE RESTRICT,
    id_ano INT NOT NULL REFERENCES anos (id_ano) ON DELETE RESTRICT,
    id_seccion INT NOT NULL REFERENCES secciones (id_seccion) ON DELETE RESTRICT,
    id_periodo_escolar INT NOT NULL REFERENCES periodos_escolares (id_periodo_escolar) ON DELETE RESTRICT,
    -- Una materia solo puede ser impartida una vez en un año, sección y período escolar específicos
    UNIQUE (
        id_materia,
        id_ano,
        id_seccion,
        id_periodo_escolar
    )
);

-- Tabla para las notas de los estudiantes
CREATE TABLE notas (
    id_nota SERIAL PRIMARY KEY,
    id_inscripcion INT NOT NULL REFERENCES inscripciones (id_inscripcion) ON DELETE CASCADE, -- La nota está ligada a una inscripción
    id_curso INT NOT NULL REFERENCES cursos (id_curso) ON DELETE RESTRICT, -- La nota es de un curso específico
    id_lapso INT NOT NULL REFERENCES lapsos (id_lapso) ON DELETE RESTRICT, -- La nota pertenece a un lapso
    calificacion INT DEFAULT 0 CHECK (
        calificacion >= 0
        AND calificacion <= 20
    ),
    descripcion_nota VARCHAR(255), -- Nuevo campo: Descripción de la nota (ej. "Examen Parcial", "Proyecto")
    fecha_registro TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_inscripciones_estudiante ON inscripciones (id_estudiante);

CREATE INDEX idx_cursos_docente ON cursos (id_docente);

CREATE INDEX idx_notas_inscripcion ON notas (id_inscripcion);

CREATE INDEX idx_notas_curso ON notas (id_curso);

CREATE INDEX idx_usuarios_email ON usuarios (email);








-- queries

-- consulta para obtener todos los estudiantes inscritos en un periodo escolar  ordenados
SELECT
    e.nombres,
    e.apellidos,
    e.cedula,
    pe.nombre AS periodo_escolar,
    a.nombre_ano AS ano_inscrito,
    s.nombre_seccion AS seccion_inscrita,
    i.fecha_inscripcion
FROM
    estudiantes e
JOIN
    inscripciones i ON e.id_estudiante = i.id_estudiante
JOIN
    periodos_escolares pe ON i.id_periodo_escolar = pe.id_periodo_escolar
JOIN
    anos a ON i.id_ano = a.id_ano
JOIN
    secciones s ON i.id_seccion = s.id_seccion
ORDER BY e.apellidos, e.nombres;







-- Consulta para ver los cursos registrados
SELECT
    m.nombre_materia,
    d.nombres AS docente_nombres,
    d.apellidos AS docente_apellidos,
    a.nombre_ano AS ano_curso,
    s.nombre_seccion AS seccion_curso,
    pe.nombre AS periodo_escolar_curso
FROM
    cursos c
JOIN
    materias m ON c.id_materia = m.id_materia
JOIN
    docentes d ON c.id_docente = d.id_docente
JOIN
    anos a ON c.id_ano = a.id_ano
JOIN
    secciones s ON c.id_seccion = s.id_seccion
JOIN
    periodos_escolares pe ON c.id_periodo_escolar = pe.id_periodo_escolar
ORDER BY m.nombre_materia, a.nombre_ano, s.nombre_seccion;







SELECT
    d.id_docente as docente_id,
    d.nombres AS docente_nombres,
    d.apellidos AS docente_apellidos,
    m.nombre_materia,
    a.nombre_ano AS ano_impartido,
    s.nombre_seccion AS seccion_impartida,
    pe.nombre AS periodo_escolar_impartido
FROM
    docentes d
JOIN
    cursos c ON d.id_docente = c.id_docente
JOIN
    materias m ON c.id_materia = m.id_materia
JOIN
    anos a ON c.id_ano = a.id_ano
JOIN
    secciones s ON c.id_seccion = s.id_seccion
JOIN
    periodos_escolares pe ON c.id_periodo_escolar = pe.id_periodo_escolar
WHERE
    d.cedula = '32986552' --  <-- ¡IMPORTANTE! Reemplaza '987654321' con la cédula del docente que deseas consultar.
ORDER BY
    d.apellidos,
    d.nombres,
    m.nombre_materia,
    ano_impartido,
    seccion_impartida;












-- TRIGGERS

--  TRIGER FOR EVIT INSET A NOTE OF A STUDENT IN A COURSE THAT HE DONT HAVE
CREATE OR REPLACE FUNCTION check_can_inset_note()
RETURNS TRIGGER AS $$
DECLARE 
id_year_student INT;
id_section_student INT;
id_curse_year INT;
id_curse_section INT;
BEGIN

    SELECT id_ano,id_seccion INTO id_year_student, id_section_student from inscripciones i WHERE i.id_inscripcion=NEW.id_inscripcion;
    SELECT id_ano,id_seccion INTO id_curse_year, id_curse_section from cursos c WHERE c.id_curso= NEW.id_curso;
    IF id_year_student != id_curse_year OR id_section_student != id_curse_section THEN
        RAISE EXCEPTION 'YOU CANNOT INSERT A IN THIS YEAR OR SECTION FOR THIS STUDENT';
    ELSE    
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER check_can_inset_note_into
BEFORE INSERT ON notas
FOR EACH ROW
EXECUTE FUNCTION check_can_inset_note();
