## Frontend (React)

This repository contains the React frontend for the project. It connects to the backend API using an environment variable (REACT_APP_API_BASE_URL).

## 📦 Prerequisites

- Node.js
 (v16 or later recommended)
- npm


## ⚙️ Installation

Clone the repository
```bash
git clone <your-frontend-repo-url>
cd frontend
npm install
```

## 🌍 Environment Variables

Create a .env file in the project root and add:
REACT_APP_API_BASE_URL=http://localhost:5000/api
Replace http://localhost:5000/api with your actual backend API URL.

All API requests will use this variable for configuration.

## ▶️ Running the Application

Start the development server:
```bash
npm start
```

The app will run at http://localhost:3000

## 🗃️ Database Migrations

Although this is the frontend repo, we recommend keeping migration files in the backend repo (using tools like Knex, Sequelize, or Prisma).

👉 For consistency, include a migrations/ folder in the backend and ensure migration commands are properly documented there.

If migrations are required for frontend state management (rare), place migration logic inside src/migrations/.
