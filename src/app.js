// Configuracion de Express
const express = require("express");
const app = express();
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

// Endpoints de autores

// Obtener todos los autores
app.get("/authors", (req, res) => {
    res.json(authors);
});

// Obtener un autor por ID
app.get("/authors/:id", (req, res) => {
    const id = Number(req.params.id);
    const author = authors.find(author => author.id === id);

    if (!author) {
        return res.status(404).json({
            message: "Autor no encontrado"
        });
    }
    res.json(author);
})

// Crear un autor
app.post("/authors", (req, res) => {
    const { name, email, bio } = req.body;

    const newAuthor = {
        id: authors.length + 1,
        name,
        email,
        bio
    };
    authors.push(newAuthor);

    res.status(201).json(newAuthor);

});

// Actualizar un autor
app.put("/authors/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, email, bio } = req.body;

    const author = authors.find(author => author.id === id);

    if (!author) {
        return res.status(404).json({
            message: "Autor no encontrado"
        });
    }

    author.name = name;
    author.email = email;
    author.bio = bio;

    res.json(author);
});

// Eliminar un autor
app.delete("/authors/:id", (req, res) => {
    const id = Number(req.params.id);
    const authorIndex = authors.findIndex(author => author.id === id);

    if (authorIndex === -1) {
        return res.status(404).json({
            message: "Autor no encontrado"
        });
    }

    authors.splice(authorIndex, 1);

    res.status(204).send();
});



// Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${PORT}`);
});