# Users-Management-System
This is the React frontend for the User Management Dashboard project.
It connects to the FeathersJS backend API (with PostgreSQL) and provides a UI for managing users.

## 📋 Features

- Display a list of users in an Ant Design table.

   - Fetch from /users endpoint.
   - Show only users where deleted: false.

- Add User
 - AntD Modal + Form to add new users (name, email, gender, etc.).
 - Update the table instantly after adding a user.

- Edit User
  - Each row has an Edit button.
  - Opens modal with pre-filled data.
  - Save changes via PATCH /users/:id.

- Soft Delete User
 - Each row has a Delete button.
 - Marks deleted: true using PATCH (not DELETE).
 - User disappears from the table instantly.
   
- Gender Filter
 - Dropdown filter: Male, Female, All.

- Good UX
 - Loading spinner during API calls.
 - Success/error messages via AntD message component.

## ⚙️ Tech Stack
- Ant Design: UI components.
- Axios or Fetch: For API requests.
- FeathersJS REST API: Backend integration.
- PostgreSQL (via Knex in backend)

## 📦 Installation

Clone the repository
```bash
git clone <your-frontend-repo-url>
cd frontend
Install dependencies

npm install
```

## 🌍 Environment Variables
Create a .env file in the project root:

REACT_APP_API_BASE_URL=http://localhost:3030


Replace http://localhost:3030 with your backend FeathersJS server URL.

## ▶️ Running the App

Start the development server:
```bash
npm start
```

The app will be available at:
👉 http://localhost:3000
