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









-- v3






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



CREATE TABLE tipos_de_evaluacion (
    id_tipo_evaluacion INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE evaluaciones (
    id_evaluacion INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion_evaluacion VARCHAR(120)
    id_curso INT NOT NULL REFERENCES cursos(id_curso),
    id_lapso INT NOT NULL REFERENCES lapsos(id_lapso),
    id_tipo_evaluacion INT NOT NULL REFERENCES tipos_de_evaluacion(id_tipo_evaluacion),
);


CREATE TABLE notas (
    id_nota SERIAL PRIMARY KEY,
    id_inscripcion INT NOT NULL REFERENCES inscripciones (id_inscripcion) ON DELETE CASCADE, -- La nota está ligada a una inscripción
    id_evaluacion INT NOT NULL REFERENCES evaluaciones (id_evaluacion) ON DELETE RESTRICT, -- La nota pertenece a una evaluación específica
    calificacion INT DEFAULT 0 CHECK (
        calificacion >= 0
        AND calificacion <= 20
    ),
    descripcion_nota VARCHAR(255), -- Nuevo campo: Descripción de la nota (ej. "Examen Parcial", "Proyecto")
    fecha_registro TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



-- insert for initial data


INSERT INTO roles (nombre_rol) VALUES
('Administrador'),
('Docente');


INSERT INTO lapsos (nombre_lapso) VALUES
('Primer Lapso'),
('Segundo Lapso'),
('Tercer Lapso');

INSERT INTO anos (nombre_ano) VALUES
('1er Año'),
('2do Año'),
('3er Año'),
('4to Año'),
('5to Año');


INSERT INTO secciones (nombre_seccion) VALUES
('A'),
('B'),
('C'),
('D'),
('E');


INSERT INTO periodos_escolares (nombre, fecha_inicio, fecha_fin) VALUES
('2023-2024', '2023-09-01', '2024-07-31');


-- Inserts para 'materias'
INSERT INTO materias (nombre_materia) VALUES
('Matemáticas'),
('Lengua y Literatura'),
('Biología'),
('Química'),
('Física'),
('Historia de Venezuela'),
('Geografía'),
('Educación Física'),
('Artes Visuales'),
('Inglés');


INSERT INTO usuarios (email, contrasena_hash, fecha_creacion) VALUES
('docente1@example.com', 'hash_ejemplo_1', '2023-08-01 10:00:00'),
('docente2@example.com', 'hash_ejemplo_2', '2023-08-02 10:00:00'),
('docente3@example.com', 'hash_ejemplo_3', '2023-08-03 10:00:00'),
('docente4@example.com', 'hash_ejemplo_4', '2023-08-04 10:00:00'),
('docente5@example.com', 'hash_ejemplo_5', '2023-08-05 10:00:00'),
('docente6@example.com', 'hash_ejemplo_6', '2023-08-06 10:00:00'),
('docente7@example.com', 'hash_ejemplo_7', '2023-08-07 10:00:00'),
('docente8@example.com', 'hash_ejemplo_8', '2023-08-08 10:00:00'),
('docente9@example.com', 'hash_ejemplo_9', '2023-08-09 10:00:00'),
('docente10@example.com', 'hash_ejemplo_10', '2023-08-10 10:00:00');


INSERT INTO usuario_roles (id_usuario, id_rol) VALUES
(1, 2), (2, 2), (3, 2), (4, 2), (5, 2),
(6, 2), (7, 2), (8, 2), (9, 2), (10, 1);


INSERT INTO docentes (id_usuario, cedula, nombres, apellidos, telefono) VALUES
(1, '10111222', 'Ana', 'García', '0414-1234567'),
(2, '10222333', 'Luis', 'Rodríguez', '0414-2345678'),
(3, '10333444', 'María', 'López', '0414-3456789'),
(4, '10444555', 'Carlos', 'Pérez', '0414-4567890'),
(5, '10555666', 'Sofía', 'Martínez', '0414-5678901'),
(6, '10666777', 'Pedro', 'Hernández', '0414-6789012'),
(7, '10777888', 'Laura', 'Gómez', '0414-7890123'),
(8, '10888999', 'Diego', 'Díaz', '0414-8901234'),
(9, '10999000', 'Elena', 'Vargas', '0414-9012345');



INSERT INTO estudiantes (cedula, nombres, apellidos, fecha_nacimiento, direccion) VALUES
('E-20111222', 'Mariana', 'Sánchez', '2008-05-15', 'Calle 10, Casa 1, Caracas'),
('E-20222333', 'Andrés', 'Morales', '2009-02-20', 'Av. Bolívar, Res. Sol, Valencia'),
('E-20333444', 'Valentina', 'Rojas', '2008-11-01', 'Urb. El Pinar, Sector 5, Maracay'),
('E-20444555', 'Ricardo', 'Castillo', '2009-08-25', 'Calle Real, Qta. Esperanza, Barquisimeto'),
('E-20555666', 'Isabella', 'Núñez', '2008-03-10', 'Zona Industrial, Galpón 4, Puerto La Cruz'),
('E-20666777', 'Fabio', 'Pérez', '2009-07-30', 'Av. Principal, Edif. Girasol, Maracaibo'),
('E-20777888', 'Camila', 'Alonso', '2008-09-05', 'Calle 5, Edif. Los Samanes, Mérida'),
('E-20888999', 'Daniel', 'Jiménez', '2009-04-12', 'Vía Nacional, Km 10, Guatire'),
('E-20999000', 'Lucía', 'Blanco', '2008-12-18', 'Urb. Los Apamates, Casa 12, San Cristóbal'),
('E-21000111', 'Santiago', 'Flores', '2009-06-22', 'Calle C, Centro, Ciudad Bolívar');


-- Inserts para 'inscripciones' (inscripciones de estudiantes a un período, año y sección)
INSERT INTO inscripciones (id_estudiante, id_ano, id_seccion, id_periodo_escolar, fecha_inscripcion) VALUES
(1, 1, 1, 1, '2023-09-05'), 
(2, 2, 2, 1, '2023-09-05'),
(3, 3, 3, 1, '2023-09-06'), 
(4, 4, 4, 1, '2023-09-06'), 
(5, 5, 5, 1, '2023-09-07'), 
(6, 1, 2, 1, '2023-09-07'), 
(7, 2, 1, 1, '2023-09-08'), 
(8, 3, 4, 1, '2023-09-08'),
(9, 4, 5, 1, '2023-09-09'),
(10, 5, 3, 1, '2023-09-09');


INSERT INTO cursos (id_materia, id_docente, id_ano, id_seccion, id_periodo_escolar) VALUES
(1, 1, 1, 1, 1), 
(2, 2, 2, 2, 1), 
(3, 3, 3, 3, 1), 
(4, 4, 4, 4, 1), 
(5, 5, 5, 5, 1), 
(6, 6, 1, 2, 1), 
(7, 7, 2, 1, 1), 
(8, 8, 3, 4, 1), 
(9, 9, 4, 5, 1); 



INSERT INTO tipos_de_evaluacion (nombre) VALUES
('Examen Escrito'),
('Exposición Oral'),
('Taller Práctico'),
('Proyecto Individual'),
('Proyecto Grupal'),
('Participación en Clase'),
('Portafolio'),
('Prueba Corta'),
('Laboratorio'),
('Trabajo de Investigación');


INSERT INTO evaluaciones (nombre, descripcion_evaluacion, id_curso, id_lapso, id_tipo_evaluacion) VALUES
('Examen Unidad 1', 'Evaluación escrita sobre los primeros temas', 1, 1, 1),
('Exposición sobre Células', 'Presentación oral sobre la estructura celular', 3, 1, 2),
('Taller de Límites', 'Ejercicios prácticos en clase', 1, 2, 3),
('Proyecto sobre la Materia', 'Proyecto individual de investigación', 4, 2, 4),
('Examen Final', 'Examen acumulativo', 2, 3, 1),
('Trabajo en equipo', 'Proyecto grupal sobre la Independencia', 6, 1, 5),
('Mapa de Venezuela', 'Presentación de un mapa político', 7, 2, 2),
('Prueba sobre Deportes', 'Prueba corta de conocimientos básicos', 8, 2, 8),
('Portafolio de Dibujos', 'Recopilación de trabajos del lapso', 9, 3, 7);


INSERT INTO notas (id_inscripcion, id_evaluacion, calificacion, descripcion_nota) VALUES
(1, 1, 18, 'Nota del examen de la Unidad 1'),
(2, 5, 15, 'Nota del examen final de Lengua'),
(3, 2, 19, 'Calificación de la exposición de Biología'),
(4, 4, 16, 'Nota del proyecto individual de Química'),
(5, 5, 17, 'Nota del examen final de Lengua (ejemplo de duplicado)'),
(6, 6, 20, 'Calificación del trabajo en equipo'),
(7, 7, 14, 'Nota del mapa de Geografía'),
(8, 8, 11, 'Calificación de la prueba corta'),
(9, 9, 19, 'Nota del portafolio de Artes');
