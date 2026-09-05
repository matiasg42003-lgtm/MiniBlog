// Configuracion de Express
const express = require("express");
const app = express();
const pool = require("./db");

const PORT = 3000;


// Datos en memoria
let authors = [
    {
        id: 1,
        name: "Ana García",
        email: "ana@example.com",
        bio: "Desarrolladora full-stack apasionada por Node.js"
    },
    {
        id: 2,
        name: "Carlos Ruiz",
        email: "carlos@example.com",
        bio: "Escritor técnico especializado en bases de datos"
    },
    {
        id: 3,
        name: "María López",
        email: "maria@example.com",
        bio: "Ingeniera de software con foco en APIs REST"
    }
];

let posts = [
    {
        id: 1,
        title: "Introducción a Node.js",
        content: "Node.js es un runtime de JavaScript...",
        author_id: 1,
        published: true
    },
    {
        id: 2,
        title: "PostgreSQL vs MySQL",
        content: "Ambas bases de datos tienen ventajas...",
        author_id: 2,
        published: true
    },
    {
        id: 3,
        title: "APIs RESTful",
        content: "REST es un estilo arquitectónico...",
        author_id: 1,
        published: true
    },
    {
        id: 4,
        title: "Manejo de errores en Express",
        content: "El manejo apropiado de errores...",
        author_id: 3,
        published: false
    },
    {
        id: 5,
        title: "Async/Await explicado",
        content: "Las promesas simplifican el código asíncrono...",
        author_id: 3,
        published: false
    }
];

// Middlewares
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        message: "API Miniblog funcionando"
    });
});


// Endpoints de autores //

// Obtener todos los autores
app.get("/authors", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM authors ORDER BY id");
        res.json(result.rows);

    } catch (error) {
        console.error("Error al obtener autores: ", error);
        res.status(500).json({
            message: "Error al obtener autores"
        });
    }
});

// Obtener un autor por ID
app.get("/authors/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Autor no encontrado"
            });
        }
        res.json(result.rows[0]);

    } catch (error) {
        console.error("Error al obtener autor: ", error);
        res.status(500).json({
            message: "Error al obtener autor"
        });
    }
});

// Crear un autor
app.post("/authors", async (req, res) => {
    try {
        const { name, email, bio } = req.body;
        const result = await pool.query(
            "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bio]
        );
        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error al crear autor:", error);
        res.status(500).json({
            message: "Error al crear autor"
        });
    }
});

// Actualizar un autor
app.put("/authors/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, bio } = req.body;
        const result = await pool.query(
            "UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *",
            [name, email, bio, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Autor no encontrado"
            });
        }
        res.json(result.rows[0]);

    } catch (erorr) {
        console.error("Error al actualizar autor:", error);
        res.status(500).json({
            message: "Error al actualizar autor"
        });
    }
});

// Eliminar un autor
app.delete("/authors/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await pool.query(
            "DELETE FROM authors WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Autor no encontrado"
            });
        }
        res.status(204).send();

    } catch (error) {
        console.error("Error al eliminar autor:", error);
        res.status(500).json({
            message: "Error al eliminar autor"
        });
    }
});



// Endpoints de posts //

// Obtener todos los posts
app.get("/posts", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM posts ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener posts:", error);
        res.status(500).json({
            message: "Error al obtener posts"
        });
    }
});

// Obtener un post por ID
app.get("/posts/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await pool.query(
            "SELECT * FROM posts WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener post:", error);
        res.status(500).json({
            message: "Error al obtener post"
        });
    }
});

// Filtrar posts por autor
app.get("/posts/author/:authorId", async (req, res) => {
    try {
        const authorId = Number(req.params.authorId);
        const result = await pool.query(
            "SELECT * FROM posts WHERE author_id = $1 ORDER BY id",
            [authorId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener posts del autor:", error);
        res.status(500).json({
            message: "Error al obtener posts del autor"
        });
    }
});
// Crear nuevo post
app.post("/posts", async (req, res) => {
    try {
        const { title, content, author_id, published } = req.body;
        const result = await pool.query(
            "INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, content, author_id, published]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear post:", error);
        res.status(500).json({
            message: "Error al crear post"
        });
    }
});

// Modificar post
app.put("/posts/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, content, author_id, published } = req.body;

        const result = await pool.query(
            "UPDATE posts SET title = $1, content = $2, author_id = $3, published = $4 WHERE id = $5 RETURNING *",
            [title, content, author_id, published, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar post:", error);
        res.status(500).json({
            message: "Error al actualizar post"
        });
    }
});

//Eliminar post
app.delete("/posts/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await pool.query(
            "DELETE FROM posts WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar post:", error);
        res.status(500).json({
            message: "Error al eliminar post"
        });
    }
});

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${PORT}`);
});