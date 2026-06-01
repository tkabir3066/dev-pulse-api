# DevPulse - Internal Tech Issue & Feature Tracker

A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

---

## Project Overview

DevPulse is a backend REST API that allows software teams to manage issues efficiently. Team members can create bug reports and feature requests, while maintainers can manage workflows, update issues, and remove issues when necessary.

The system uses JWT-based authentication and role-based authorization to secure protected resources.

---

# Features

### Authentication

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Role-Based Authorization

### Issue Management

- Create Issue
- Get All Issues
- Get Single Issue
- Update Issue
- Delete Issue

### Authorization Rules

#### Contributor

- Register
- Login
- Create Issues
- View Issues
- Update Own Issue (Only when status is open)

#### Maintainer

- All Contributor Permissions
- Update Any Issue
- Delete Any Issue
- Change Issue Status

---

# Technology Stack

| Technology        | Purpose                |
| ----------------- | ---------------------- |
| Node.js           | Runtime Environment    |
| TypeScript        | Programming Language   |
| Express.js        | Backend Framework      |
| PostgreSQL        | Database               |
| pg                | PostgreSQL Driver      |
| bcrypt            | Password Hashing       |
| jsonwebtoken      | Authentication         |
| dotenv            | Environment Variables  |
| http-status-codes | HTTP Status Management |

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd dev-pulse
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Run Production Build

```bash
npm start
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DATABASE_URL=postgresql://postgres:password@localhost:5432/devpulse

BCRYPT_SALT_ROUNDS=10

JWT_SECRET=your_super_secret_key

JWT_EXPIRES_IN=7d
```

---

# Database Schema

## Users Table

| Field      | Type                     |
| ---------- | ------------------------ |
| id         | SERIAL                   |
| name       | VARCHAR(100)             |
| email      | VARCHAR(255) UNIQUE      |
| password   | TEXT                     |
| role       | contributor / maintainer |
| created_at | TIMESTAMP                |
| updated_at | TIMESTAMP                |

---

## Issues Table

| Field       | Type                          |
| ----------- | ----------------------------- |
| id          | SERIAL                        |
| title       | VARCHAR(150)                  |
| description | TEXT                          |
| type        | bug / feature_request         |
| status      | open / in_progress / resolved |
| reporter_id | INTEGER                       |
| created_at  | TIMESTAMP                     |
| updated_at  | TIMESTAMP                     |

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/auth/signup
```

Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "contributor"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Issues

### Create Issue

```http
POST /api/issues
```

Authorization Required

```json
{
  "title": "Database timeout issue",
  "description": "Pool exhausted after multiple requests",
  "type": "bug"
}
```

---

### Get All Issues

```http
GET /api/issues
```

Optional Query Parameters

```http
/api/issues?sort=newest

/api/issues?status=open

/api/issues?type=bug

/api/issues?status=open&type=bug
```

---

### Get Single Issue

```http
GET /api/issues/:id
```

---

### Update Issue

```http
PATCH /api/issues/:id
```

Authorization Required

```json
{
  "title": "Updated Issue Title",
  "description": "Updated description",
  "type": "bug"
}
```

---

### Delete Issue

```http
DELETE /api/issues/:id
```

Maintainer Only

---

# Authentication Flow

1. User Registers
2. Password Stored as Hash
3. User Logs In
4. JWT Token Generated
5. Client Stores Token
6. Client Sends Token in Authorization Header

Example:

```http
Authorization: <JWT_TOKEN>
```

7. Server Verifies Token
8. Request Proceeds

---

# Authorization Rules

| Action                | Contributor | Maintainer |
| --------------------- | ----------- | ---------- |
| Create Issue          | ✅          | ✅         |
| View Issues           | ✅          | ✅         |
| Update Own Open Issue | ✅          | ✅         |
| Update Any Issue      | ❌          | ✅         |
| Delete Issue          | ❌          | ✅         |
| Change Status         | ❌          | ✅         |

---

# Success Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

# Error Response Format

```json
{
  "success": false,
  "message": "Error occurred",
  "errors": "Detailed error message"
}
```

---

# Available Scripts

```bash
npm run dev
```

Runs development server.

```bash
npm run build
```

Builds TypeScript project.

```bash
npm start
```

Runs production build.

---

# Folder Structure

```text
DEV-PULSE
│
├── src
│   │
│   ├── config
│   │   ├── env.ts
│   │   └── db.ts
│   │
│   ├── errors
│   │   └── ApiError.ts
│   │
│   ├── middlewares
│   │   ├── auth.ts
│   │   └── globalErrorHandler.ts
│   │
│   ├── modules
│   │   │
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.interface.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.service.ts
│   │   │
│   │   └── issue
│   │       ├── issue.constant.ts
│   │       ├── issue.controller.ts
│   │       ├── issue.interface.ts
│   │       ├── issue.route.ts
│   │       └── issue.service.ts
│   │
│   ├── sqlQuery
│   │   └── queries.ts
│   │
│   ├── types
│   │   ├── commonType.ts
│   │   └── index.d.ts
│   │
│   ├── utils
│   │   ├── catchAsync.ts
│   │   └── sendResponse.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

# Author

Tutul Kabir

Backend Developer | Node.js | Express.js | PostgreSQL | TypeScript

---

# License

This project is developed for educational and assignment purposes.
