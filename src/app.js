// Configuracion de Express
const express = require("express");
const app = express();
const pool = require("./db");

const PORT = process.env.PORT || 3000;



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
app.get("/authors", async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM authors ORDER BY id");
        res.json(result.rows);

    } catch (error) {
        next(error);
    }
});

// Obtener un autor por ID
app.get("/authors/:id", async (req, res, next) => {
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
        next(error);
    }
});

// Crear un autor
app.post("/authors", async (req, res, next) => {
    try {
        const { name, email, bio } = req.body;

        // Validar campos obligatorios
        if (!name || !name.trim() || !email || !email.trim()) {
            return res.status(400).json({
                message: "Nombre y email son obligatorios"
            });
        }

        const result = await pool.query(
            "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bio]
        );
        res.status(201).json(result.rows[0]);

    } catch (error) {
        next(error);
    }
});

// Actualizar un autor
app.put("/authors/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name, email, bio } = req.body;

        // Validar campos obligatorios
        if (!name || !name.trim() || !email || !email.trim()) {
            return res.status(400).json({
                message: "Nombre y email son obligatorios"
            });
        }

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

    } catch (error) {
        next(error);
    }
});

// Eliminar un autor
app.delete("/authors/:id", async (req, res, next) => {
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
        next(error);
    }
});



// Endpoints de posts //

// Obtener todos los posts
app.get("/posts", async (req, res, next) => {
    try {
        const result = await pool.query(
            "SELECT * FROM posts ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
});

// Obtener un post por ID
app.get("/posts/:id", async (req, res, next) => {
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
        next(error);
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
        next(error);
    }
});

// Crear nuevo post
app.post("/posts", async (req, res, next) => {
    try {
        const { title,
            content,
            author_id,
            published = false
        } = req.body;

        // Validar campos obligatorios
        if (
            !title ||
            !title.trim() ||
            !content ||
            !content.trim() ||
            author_id === undefined ||
            author_id === null
        ) {
            return res.status(400).json({
                message: "Título, contenido y autor son obligatorios"
            });
        }

        const result = await pool.query(
            "INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, content, author_id, published]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Modificar post
app.put("/posts/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const { title,
            content,
            author_id,
            published = false
        } = req.body;

        // Validar campos obligatorios
        if (
            !title ||
            !title.trim() ||
            !content ||
            !content.trim() ||
            author_id === undefined ||
            author_id === null
        ) {
            return res.status(400).json({
                message: "Título, contenido y autor son obligatorios"
            });
        }

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
        next(error);
    }
});

//Eliminar post
app.delete("/posts/:id", async (req, res, next) => {
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
        next(error);
    }
});

// Middleware global de errores
app.use((error, req, res, next) => {
    console.error(error);

    // Email duplicado
    if (error.code === "23505") {
        return res.status(400).json({
            message: "El email ya está registrado"
        });
    }

    // Clave foránea inválida
    if (error.code === "23503") {
        return res.status(400).json({
            message: "El autor no existe"
        });
    }

    // Campo obligatorio faltante
    if (error.code === "23502") {
        return res.status(400).json({
            message: "Falta un campo obligatorio"
        });
    }

    // ID con formato incorrecto
    if (error.code === "22P02") {
        return res.status(400).json({
            message: "El ID no es válido"
        });
    }

    // Error desconocido
    res.status(500).json({
        message: "Error interno del servidor"
    });
});


// Servidor
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en ${PORT}`);
    });
}

// Exportar la aplicación
module.exports = app;