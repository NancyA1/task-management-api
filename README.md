# Task Management API

A REST API for managing projects and tasks built with **Node.js**, **Express.js**, **Prisma ORM**, and **Microsoft SQL Server**.

This project was developed as a backend assessment and demonstrates CRUD operations, validation, pagination, filtering, searching, sorting, database migrations, automated testing, and seed data.

---

# Prerequisites

* Node.js 22+
* Microsoft SQL Server
* npm

---

# Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/NancyA1/task-management-api.git
cd task-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure SQL Server

Create a SQL Server database named **TaskManagementAPI**.

Create a `.env` file in the project root and add your database connection string.

**Windows Authentication (Integrated Security)**

```env
DATABASE_URL="sqlserver://YOUR_SERVER;database=TaskManagementAPI;integratedSecurity=true;trustServerCertificate=true"
```

**SQL Server Authentication**

```env
DATABASE_URL="sqlserver://YOUR_SERVER;database=TaskManagementAPI;user=YOUR_USERNAME;password=YOUR_PASSWORD;trustServerCertificate=true"
```

Replace:

* `YOUR_SERVER` with your SQL Server instance.
* `YOUR_USERNAME` with your SQL Server username (if using SQL Server Authentication).
* `YOUR_PASSWORD` with your SQL Server password (if using SQL Server Authentication).

Use the connection string that matches your SQL Server authentication method.


### 4. Apply Prisma migrations

```bash
npx prisma migrate dev
```

### 5. (Optional) Seed the database

Populate the database with sample data.

```bash
npx prisma db seed
```

### 6. Start the server

```bash
node src/server.js
```

The API will be available at:

```text
http://localhost:3000
```

### 7. Run the tests

```bash
npm test
```

The project uses **Jest** and **Supertest** for integration and validation testing.

---

# Tech Stack

* Node.js
* Express.js
* Prisma ORM
* Microsoft SQL Server
* Jest
* Supertest

---

# Features

### Project Management

* Create a project
* Retrieve all projects
* Retrieve a project by ID
* Update a project
* Delete a project

### Task Management

* Create tasks under a project
* Retrieve all tasks
* Retrieve project tasks
* Retrieve a task by ID
* Update a task
* Delete a task

### Additional Features

* Pagination
* Search by title and description
* Filter by status
* Filter by priority
* Filter by due date
* Sorting
* Input validation
* Database indexes
* Seed script
* Automated testing

---

# Database Schema

The database contains two entities:

* **Project** – stores project information.
* **Task** – stores task information and belongs to a project.

Relationship:

* One Project can have many Tasks.
* Each Task belongs to exactly one Project.

Database indexes were added to improve filtering and sorting performance.

---

# API Endpoints

## Projects

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | `/api/projects`     |
| GET    | `/api/projects`     |
| GET    | `/api/projects/:id` |
| PUT    | `/api/projects/:id` |
| DELETE | `/api/projects/:id` |

## Tasks

| Method | Endpoint                         |
| ------ | -------------------------------- |
| POST   | `/api/projects/:projectId/tasks` |
| GET    | `/api/projects/:projectId/tasks` |
| GET    | `/api/tasks`                     |
| GET    | `/api/tasks/:id`                 |
| PUT    | `/api/tasks/:id`                 |
| DELETE | `/api/tasks/:id`                 |

---

# Example Requests & Responses

## Create Project

**Request**

```http
POST /api/projects
```

```json
{
  "name": "Task Management API",
  "description": "Backend assessment project"
}
```

**Response (201 Created)**

```json
{
  "id": 1,
  "name": "Task Management API",
  "description": "Backend assessment project",
  "createdAt": "2026-07-23T18:30:00.000Z",
  "updatedAt": "2026-07-23T18:30:00.000Z"
}
```

---

## Create Task

**Request**

```http
POST /api/projects/1/tasks
```

```json
{
  "title": "Build API",
  "description": "Implement CRUD endpoints",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-08-01"
}
```

**Response (201 Created)**

```json
{
  "id": 1,
  "projectId": 1,
  "title": "Build API",
  "description": "Implement CRUD endpoints",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-08-01T00:00:00.000Z",
  "createdAt": "2026-07-23T18:31:00.000Z",
  "updatedAt": "2026-07-23T18:31:00.000Z"
}
```

---

# Query Parameters

The task endpoints support the following query parameters.

| Parameter       | Description                                   |
| --------------- | --------------------------------------------- |
| `page`          | Page number                                   |
| `limit`         | Number of items per page                      |
| `status`        | Filter by task status                         |
| `priority`      | Filter by task priority                       |
| `due_date_from` | Minimum due date                              |
| `due_date_to`   | Maximum due date                              |
| `q`             | Search by title or description                |
| `sortBy`        | Sort by `createdAt`, `priority`, or `dueDate` |
| `order`         | `asc` or `desc`                               |

Example:

```text
/api/tasks?status=done&priority=high&page=1&limit=10&sortBy=dueDate&order=asc
```

---

# Validation

The API validates requests before writing to the database.

* Project name is required.
* Project names must be unique.
* Task title is required.
* Valid status values: `todo`, `in_progress`, `done`.
* Valid priority values: `low`, `medium`, `high`.
* Due dates cannot be in the past.
* Invalid sort fields return **400 Bad Request**.

---

# Bonus Features

Implemented bonus features:

* Database seed script
* Database indexes
* Automated integration tests
* Validation tests
