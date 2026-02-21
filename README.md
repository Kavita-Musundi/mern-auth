# MERN Authentication System

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring JWT authentication, protected routes, and user profile management.

## Features

- User Registration with encrypted passwords
- User Login with JWT tokens
- Protected Routes (authenticated users only)
- Persistent Login with token validation
- Profile Update functionality
- "Remember Me" option for longer sessions
- Form Validation with error messages
- Loading States during API calls
- Responsive Bootstrap UI
- Logout functionality

## Tech Stack

**Frontend:**
- React.js (with Vite)
- React Router DOM
- Axios for API calls
- Bootstrap 5 for styling
- Context API for state management

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Project Structure

mern-auth/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ └── auth.js
│ ├── middleware/
│ │ └── auth.js
│ ├── .env.example
│ ├── server.js
│ └── package.json
└── frontend/
├── src/
│ ├── components/
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ ├── Dashboard.jsx
│ │ ├── Profile.jsx
│ │ └── ProtectedRoute.jsx
│ ├── context/
│ │ └── AuthContext.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── index.html
├── vite.config.js
└── package.json


## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone the repository
```bash
git clone https://github.com/Kavita-Musundi/mern-auth.git
cd mern-auth
