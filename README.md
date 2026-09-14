# Task Management REST API

A backend REST API built with **Node.js, TypeScript, Express, PostgreSQL, and Prisma**.

The project provides user authentication using **bcrypt and JWT**, protected task management, user-based task ownership, and role-based authorization for admin users.

## 🚀 Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- JWT expiration after 15 minutes
- Protected task routes
- User-specific task ownership
- Users can only access their own tasks
- `/api/auth/me` endpoint
- Role-based authorization
- Admin-only endpoint
- Request validation middleware
- Global error-handling middleware
- Request logger middleware
- PostgreSQL database with Prisma ORM

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- JWT (`jsonwebtoken`)
- bcrypt
- dotenv
- HTTPie / Postman for API testing

## 📁 Project Structure

```text
src/
├── server.ts
├── lib/
│   └── prisma.ts
├── routes/
│   ├── task.routes.ts
│   └── auth.routes.ts
├── controllers/
│   ├── task.controller.ts
│   └── auth.controller.ts
├── middleware/
│   ├── logger.middleware.ts
│   ├── validateTask.middleware.ts
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   └── error.middleware.ts
└── generated/
    └── prisma/
