const request = require("supertest");

const app = require("../src/app");

// Tests de autores
describe("Autores", () => {
    // Crear un autor
    test("Debe crear un autor", async () => {
        const response = await request(app)
            .post("/authors")
            .send({
                name: "Autor de prueba",
                email: `autor${Date.now()}@example.com`,
                bio: "Autor creado desde un test"
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Autor de prueba");
    });

    // Obtener un autor
    test("Debe obtener un autor", async () => {
        const response = await request(app)
            .get("/authors/1");

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });

});

// Tests de posts
describe("Posts", () => {

    // Crear un post
    test("Debe crear un post", async () => {
        const response = await request(app)
            .post("/posts")
            .send({
                title: "Post de prueba",
                content: "Contenido del post de prueba",
                author_id: 1,
                published: false
            });

        expect(response.status).toBe(201);
        expect(response.body.title).toBe("Post de prueba");
    });

});

// Tests de manejo de errores
describe("Manejo de errores", () => {

    // Eliminar un recurso inexistente
    test("Debe devolver 404 al eliminar un autor inexistente", async () => {
        const response = await request(app)
            .delete("/authors/99999");

        expect(response.status).toBe(404);
    });

});