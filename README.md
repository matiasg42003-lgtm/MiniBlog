# MiniBlog API

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar autores y publicaciones.

El proyecto permite realizar operaciones CRUD sobre autores y posts, utilizando PostgreSQL como base de datos y consultas SQL parametrizadas.

## Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* pg (node-postgres)
* Vitest
* Supertest
* OpenAPI

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/matiasg42003-lgtm/MiniBlog.git
cd MiniBlog
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=miniblog
DB_PASSWORD=
DB_PORT=5432
```

Completar `DB_PASSWORD` con la contraseña del usuario de PostgreSQL.

### 4. Crear la base de datos

Crear una base de datos llamada `miniblog` en PostgreSQL.

Luego ejecutar los scripts:

```text
sql/setup.sql
sql/seed.sql
```

`setup.sql` crea las tablas y sus relaciones, mientras que `seed.sql` agrega datos iniciales para realizar pruebas.

## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3000
```

## Endpoints

### Autores

| Método | Endpoint       | Descripción               |
| ------ | -------------- | ------------------------- |
| GET    | `/authors`     | Obtener todos los autores |
| GET    | `/authors/:id` | Obtener un autor por ID   |
| POST   | `/authors`     | Crear un autor            |
| PUT    | `/authors/:id` | Actualizar un autor       |
| DELETE | `/authors/:id` | Eliminar un autor         |

### Posts

| Método | Endpoint                  | Descripción               |
| ------ | ------------------------- | ------------------------- |
| GET    | `/posts`                  | Obtener todos los posts   |
| GET    | `/posts/:id`              | Obtener un post por ID    |
| GET    | `/posts/author/:authorId` | Obtener posts de un autor |
| POST   | `/posts`                  | Crear un post             |
| PUT    | `/posts/:id`              | Actualizar un post        |
| DELETE | `/posts/:id`              | Eliminar un post          |

## Ejemplos de datos

### Crear un autor

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "bio": "Desarrollador backend"
}
```

### Crear un post

```json
{
  "title": "Mi primer post",
  "content": "Contenido del post",
  "author_id": 1,
  "published": false
}
```

## Códigos de respuesta

La API utiliza códigos HTTP para indicar el resultado de cada operación:

* `200` — Operación exitosa.
* `201` — Recurso creado correctamente.
* `204` — Recurso eliminado correctamente, sin contenido en la respuesta.
* `400` — Datos inválidos o error de validación.
* `404` — Recurso no encontrado.
* `500` — Error interno del servidor.

## Tests

El proyecto utiliza **Vitest** y **Supertest** para realizar pruebas sobre los endpoints de la API.

Para ejecutar los tests:

```bash
npm test
```

Los tests verifican, entre otras cosas:

* Creación de un autor.
* Obtención de un autor.
* Creación de un post.
* Manejo de recursos inexistentes mediante respuestas `404`.

## Documentación OpenAPI

La API cuenta con documentación utilizando **OpenAPI**.

El archivo de documentación se encuentra en:

```text
openapi.yaml
```

Allí se encuentran definidos los endpoints, parámetros, datos de entrada y códigos de respuesta de la API.

## Uso de Inteligencia Artificial

Durante el desarrollo de MiniBlog se utilizó Inteligencia Artificial como herramienta de apoyo para comprender conceptos, resolver errores y revisar decisiones de implementación.

Algunos usos concretos fueron:

* **Conexión con PostgreSQL:** se consultó cómo configurar `pg`, `Pool` y las variables de entorno mediante un archivo `.env`, y se revisó el funcionamiento de `pool.query()` y las consultas parametrizadas.
* **Manejo de errores:** se utilizó IA para comprender el funcionamiento de `try/catch`, `next(error)` y el middleware global de errores de Express.
* **Errores de PostgreSQL:** se consultó el significado de códigos como `23505` (email duplicado), `23503` (clave foránea inexistente), `23502` (campo obligatorio) y `22P02` (dato inválido).
* **Tests:** se recibió orientación para configurar Vitest y Supertest en un proyecto CommonJS, incluyendo la creación de `vitest.config.js` y la exportación de `app` para poder realizar pruebas sin iniciar el servidor.
* **OpenAPI:** se utilizó IA para comprender qué información debía documentarse y para estructurar el archivo `openapi.yaml` con los endpoints de autores y posts.
* **Resolución de errores durante el desarrollo:** se consultó IA para analizar errores concretos del proyecto, como problemas con rutas, IDs inválidos y errores de sintaxis.
* **Documentación:** se utilizó IA como apoyo para organizar y redactar el README, explicando cómo instalar, configurar, ejecutar y probar el proyecto.


