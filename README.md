# 📘 Blog UOC Project – Backend API (NestJS)

API REST desarrollada con **NestJS + TypeORM + PostgreSQL** para dar soporte a las prácticas de Angular.

Incluye autenticación JWT y documentación Swagger integrada.

---

## 🚀 Requisitos

- Node.js **v24.x** (recomendado)
- npm
- PostgreSQL en local (puerto 5432)

Comprobar versión:

```bash
node -v
```

---

## 🗄️ Base de datos

La API está configurada para conectarse a:

- Host: `localhost`
- Puerto: `5432`
- Usuario: `postgres`
- Password: `root`
- Base de datos: `blog-uoc-project`

Asegúrate de:

1. Tener PostgreSQL en ejecución.
2. Haber creado la base de datos:

```sql
CREATE DATABASE blog-uoc-project;
```

---

## 📦 Instalación

El proyecto incluye un archivo `.npmrc` para evitar conflictos de dependencias.

Solo debes ejecutar:

```bash
npm install
```

---

## ▶️ Arranque del servidor

```bash
npm run start
```

El servidor se iniciará en:

```
http://localhost:3000
```

---

## 📚 Documentación Swagger

Una vez arrancado el servidor:

👉 Accede a:

```
http://localhost:3000/api
```

Aquí encontrarás todos los endpoints organizados por módulos:

- Auth
- Users
- Posts
- Categories

---

## 🔐 Autenticación (JWT)

La API utiliza autenticación **Bearer Token (JWT)**.

### 1️⃣ Login

Endpoint:

```
POST /auth
```

Body de ejemplo:

```json
{
  "email": "usuario@demo.com",
  "password": "1234"
}
```

Respuesta:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2️⃣ Autorizar en Swagger

1. Copiar el `access_token`
2. Pulsar botón **Authorize**
3. Pegar:

```
Bearer TU_TOKEN_AQUI
```

4. Confirmar

Ahora podrás probar endpoints protegidos.

---

## 🌐 Endpoints principales

### 🔑 Auth
- `POST /auth` → Login

### 👤 Users
- `GET /users` (privado)
- `GET /users/:id` (privado)
- `POST /users`
- `PUT /users/:id` (privado)
- `DELETE /users/:id` (privado)

### 📝 Posts
- `GET /posts`
- `GET /posts/:id`
- `POST /posts` (privado)
- `PUT /posts/:id` (privado)
- `PUT /posts/like/:id` (privado)
- `PUT /posts/dislike/:id` (privado)
- `DELETE /posts/:id` (privado)

### 🗂 Categories
- `GET /categories` (privado)
- `GET /categories/:id` (privado)
- `POST /categories` (privado)
- `PUT /categories/:id` (privado)
- `DELETE /categories/:id` (privado)

---

## 🛠️ Flujo recomendado de prueba

1. Crear usuario (`POST /users`)
2. Hacer login (`POST /auth`)
3. Autorizar en Swagger
4. Crear categoría
5. Crear post
6. Probar like/dislike

---

## 🧠 Notas importantes

- Si VSCode muestra errores de tipos:
  - Reiniciar TS Server (`Ctrl + Shift + P → TypeScript: Restart TS Server`)
- Si hay problemas de dependencias:
  - El proyecto ya está preparado con `.npmrc`
  - Solo usar `npm install`
- No actualizar dependencias durante el curso.

---