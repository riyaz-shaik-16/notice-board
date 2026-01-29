# College Staff Portal (CSP)

This is a full-stack web application designed for college administration. It provides a platform for officials to post notices and for administrators to manage the officials. The project is built with a React frontend and a Node.js (Express) backend.

## Features

- **Authentication:** Secure login for Officials and Admins.
- **Role-Based Access Control:**
  - **Admin:**
    - Dashboard to view all officials.
    - Create, view, and manage official accounts.
  - **Official:**
    - Dashboard to view and manage their own notices.
    - Create new notices with titles, content, and visibility dates.
- **Public Notice Board:** A publicly accessible page to view all active notices.
- **Responsive UI:** The frontend is designed to work on various screen sizes.

## Tech Stack

### Frontend
- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast frontend build tool.
- **Axios:** A promise-based HTTP client for making API requests.
- **React Router:** For declarative routing in the React application.
- **Context API:** For state management (Authentication and Notices).
- **Tailwind CSS:** For styling the user interface.

### Backend
- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A web application framework for Node.js.
- **MongoDB:** A NoSQL database (assumed, with Mongoose as ODM).
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB.
- **JSON Web Tokens (JWT):** For securing the API endpoints.
- **bcrypt.js:** For hashing passwords.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (or yarn)
- MongoDB instance (local or cloud-based like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd csp
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env` file in the `frontend` directory and add the backend API URL:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

### Running the Application

1.  **Run the Backend Server:**
    From the `backend` directory:
    ```bash
    npm start
    ```
    The backend server will start on `http://localhost:5000`.

2.  **Run the Frontend Development Server:**
    From the `frontend` directory:
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
.
├── backend/        # Node.js/Express.js backend
│   ├── src/
│   ├── package.json
│   └── ...
└── frontend/       # React/Vite frontend
    ├── src/
    ├── package.json
    └── ...
```

-   The `backend` directory contains the server-side code, including API routes, controllers, models, and database configuration.
-   The `frontend` directory contains the client-side React application, including components, pages, and context for state management.
