# Backend API Documentation

## Endpoint: POST /users/register

This endpoint registers a new user in the system.

### Purpose
Create a new user account with a full name, email, and password.

### Request URL
```http
POST /users/register
```

### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "123456"
}
```

### Validation Rules
- `fullname.firstname` is required and must be at least 3 characters long
- `fullname.lastname` is required
- `email` must be a valid email address
- `password` must be at least 6 characters long

### Success Response
```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

### Error Response
```json
{
  "errors": [
    {
      "msg": "invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## Building Blocks

### 1. Route Layer
File: `routes/user.routes.js`

- Defines the `/users/register` POST route
- Applies validation middleware using `express-validator`
- Sends the request to the controller

### 2. Controller Layer
File: `controller/user.controller.js`

- Receives the request
- Checks validation errors
- Extracts data from `req.body`
- Hashes the password
- Calls the service to create the user
- Returns the created user and JWT token

### 3. Service Layer
File: `services/user.service.js`

- Contains the business logic for creating a user
- Validates the required fields
- Creates the user in the database

### 4. Model Layer
File: `models/user.js`

- Defines the MongoDB schema for the user
- Contains methods for:
  - generating JWT auth tokens
  - hashing passwords
  - comparing passwords

### 5. Database Connection
File: `db/db.js`

- Connects the app to MongoDB

### 6. App Entry Point
File: `app.js`

- Mounts the route at `/users`
- Enables JSON parsing and CORS

---

## Flow of the Request

1. Client sends a `POST` request to `/users/register`
2. Route validates the incoming request body
3. Controller receives the validated data
4. Password is hashed using bcrypt
5. Service creates the new user record
6. A JWT token is generated for the user
7. Response is sent back to the client

---

## Notes
- The JWT secret is read from the environment variable `JWT_SECRET`
- Passwords are stored as hashed values
- The endpoint is mounted under `/users` in the main app
