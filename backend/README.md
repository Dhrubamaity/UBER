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

## Endpoint: POST /users/login

This endpoint authenticates an existing user and returns a JWT token.

### Purpose
Validate the user's credentials and sign them in.

### Request URL
```http
POST /users/login
```

### Request Body
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Validation Rules
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
  "message": "Inavalid email or password"
}
```

---

## Endpoint: GET /users/profile

This endpoint returns the authenticated user's profile.

### Purpose
Fetch the current user's profile data using the JWT token.

### Request URL
```http
GET /users/profile
```

### Authentication
- Requires a valid JWT token in the `Authorization` header as `Bearer <token>`
- Or a cookie named `token`

### Success Response
```json
{
  "_id": "<user_id>",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com"
}
```

### Error Response
```json
{
  "message": "user not authorized by token"
}
```

---

## Endpoint: POST /users/logout

This endpoint logs out the authenticated user and blacklists the token.

### Purpose
Invalidate the current session token and clear the auth cookie.

### Request URL
```http
POST /users/logout
```

### Authentication
- Requires a valid JWT token in the `Authorization` header as `Bearer <token>`
- Or a cookie named `token`

### Success Response
```json
{
  "messag": "User Logedout"
}
```

### Error Response
```json
{
  "message": "user not authorized by token"
}
```

---

## Captain Routes

These routes are mounted under `/captains` in the backend app.

### 1. POST /captains/register

Register a new captain account.

#### Request Body
```json
{
  "fullname": {
    "firstname": "Rahul",
    "lastname": "Sharma"
  },
  "email": "rahul@example.com",
  "password": "123456",
  "vehicle": {
    "vehicleType": "car",
    "color": "Black",
    "plate": "DL01AB1234",
    "capacity": "4"
  }
}
```

#### Validation Rules
- `email` must be a valid email
- `password` must be at least 6 characters
- `fullname.firstname` must be at least 3 characters
- `vehicle.vehicleType` must be one of: `car`, `bike`, `auto`
- `vehicle.color`, `vehicle.plate` must be at least 3 characters
- `vehicle.capacity` must not be empty

#### Success Response
```json
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "<captain_id>",
    "fullname": {
      "firstname": "Rahul",
      "lastname": "Sharma"
    },
    "email": "rahul@example.com",
    "vehicle": {
      "vehicleType": "car",
      "color": "Black",
      "plate": "DL01AB1234",
      "capacity": "4"
    }
  }
}
```

#### Error Response
```json
{
  "message": "Email alreday exist"
}
```

### 2. POST /captains/login

Authenticate an existing captain and return a JWT token.

#### Request Body
```json
{
  "email": "rahul@example.com",
  "password": "123456"
}
```

#### Validation Rules
- `email` must be a valid email
- `password` must be at least 6 characters

#### Success Response
```json
{
  "token": "<jwt_token>",
  "Captain": {
    "_id": "<captain_id>",
    "email": "rahul@example.com"
  }
}
```

#### Error Response
```json
{
  "message": "Invalid Email or Password"
}
```

### 3. GET /captains/profile

Fetch the logged-in captain profile.

#### Authentication
- Requires a valid JWT token in the `Authorization` header as `Bearer <token>`
- Or a cookie named `token`

#### Success Response
```json
{
  "_id": "<captain_id>",
  "fullname": {
    "firstname": "Rahul",
    "lastname": "Sharma"
  },
  "email": "rahul@example.com"
}
```

#### Error Response
```json
{
  "message": "Captain not authorized by token"
}
```

### 4. GET /captains/logout

Log out the captain and blacklist the current token.

#### Authentication
- Requires a valid JWT token in the `Authorization` header as `Bearer <token>`
- Or a cookie named `token`

#### Success Response
```json
{
  "message": "Captain loged out"
}
```

#### Error Response
```json
{
  "message": "Token is expaired or blacklisted"
}
```

### Captain Route Test Cases

#### Register Captain
- Successful registration with valid data
- Fails when email is invalid
- Fails when password is shorter than 6 characters
- Fails when vehicle type is not one of `car`, `bike`, or `auto`
- Fails when the email already exists

#### Login Captain
- Successful login with correct email and password
- Fails with wrong password
- Fails with non-existent email
- Fails when validation rules are not met

#### Get Profile
- Returns profile successfully for a valid token
- Fails when token is missing or invalid
- Fails when token has been blacklisted

#### Logout Captain
- Logs out successfully with a valid token
- Clears the auth cookie
- Fails when token is missing or already blacklisted

#### Example Test Commands
```bash
curl -X POST http://localhost:5000/captains/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Rahul","lastname":"Sharma"},"email":"rahul@example.com","password":"123456","vehicle":{"vehicleType":"car","color":"Black","plate":"DL01AB1234","capacity":"4"}}'

curl -X POST http://localhost:5000/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rahul@example.com","password":"123456"}'

curl -X GET http://localhost:5000/captains/profile \
  -H "Authorization: Bearer <token>"
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
