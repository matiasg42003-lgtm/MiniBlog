/* Ingresar datos a las tablas */
INSERT INTO authors (name, email, bio) VALUES
('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST');

INSERT INTO posts (title, content, author_id, published) VALUES
('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 1, true),
('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),
('APIs RESTful', 'REST es un estilo arquitectónico...', 1, true),
('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),
('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 3, false);CREATE TABLE authors (


/* PRUEBAS*/ 

 /* Consultas */
SELECT
posts.title, authors.name
FROM posts
JOIN authors
ON posts.author_id = authors.id;

 /* Seed */
INSERT INTO posts (title, content, author_id)
VALUES ('Post de prueba', 'Contenido de prueba', 999);

 /* Modificar*/
UPDATE authors
SET bio = 'Desarrolladora full-stack apasionada por Node.js'
WHERE id = 1;

SELECT * FROM authors
WHERE id = 1;

 /* Borrar */
INSERT INTO authors (name, email, bio)
VALUES ('Autor Prueba', 'prueba@ejemplo.com', 'Autor temporal');
SELECT * FROM authors;

DELETE FROM authors
WHERE ID = 4;