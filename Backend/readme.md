# User Management Dashboard - Backend (FeathersJS + PostgreSQL)

This repository contains the **FeathersJS backend API** for the User Management Dashboard project.  
It provides RESTful APIs to manage users, connected to a **PostgreSQL** database via **Knex**.

---

## 📦 Requirements
- Node.js (>=14.x recommended)  
- PostgreSQL installed and running  
- npm or yarn  

---

## 🚀 Setup & Installation

```bash
# Clone the repository
git clone <your-backend-repo-url>
cd backend

# Install dependencies
npm install
```
---
## ⚙️ Environment Variables
Create a .env file in the root directory and configure:

PORT=3030
DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database_name>


⚠️ Make sure the database exists before running migrations.

---
## 🗄️ Database Migration

Run the migration to create the required users table:
```bash
npm run migrate
```
---
## ▶️ Run the Server

Start the backend server:
```bash
npm start
```
By default, the API will be available at:
http://localhost:3030

## 📡 API Endpoints

- GET /users → Fetch all users (deleted: false only)

- POST /users → Add a new user

- PATCH /users/:id → Update user details

- PATCH /users/:id → Soft delete user (sets deleted: true)

## 🔗 Frontend Connection

The frontend connects to this backend using the environment variable:

### REACT_APP_API_BASE_URL=http://localhost:3030


Ensure that this is set correctly in the frontend .env file.

## 📦 Tech Stack

- Node.js + FeathersJS

- PostgreSQL with Knex migrations

- REST API architecture

