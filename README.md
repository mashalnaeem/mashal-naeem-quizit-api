# mashal-naeem-quizit-api
# QuizIt API

QuizIt API is a backend application for a quiz app built with Node.js, Knex.js, and MySQL database.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
  - [Developer Environment](#developer-environment)
  - [Production Environment](#production-environment)
- [API References](#api-references)
- [Screenshots](#screenshots)
- [Lessons Learned & Next Steps](#lessons-learned--next-steps)

## Tech Stack

- Node.js
- Knex.js
- MySQL

## Features

- Create, read, update, and delete quizzes
- Create, read, update, and delete questions
- Manage user accounts
- Authenticate users
- Track user scores

## Installation

### Developer Environment

1. Clone the repository:

```bash
git clone <repository-url>
cd quizIt-api
npm install
cp .env.example .env
npx knex migrate:latest
```
## API References

### Quiz Endpoints

- **GET /quizzes**: Get all quizzes
- **GET /quizzes/:id**: Get a quiz by ID
- **GET /quizzes/:id/questions**: Get questions for a quiz
- **POST /quizzes/:userId**: Create a new quiz for a user
- **PUT /quizzes/:userId/:quizId**: Update a quiz for a user by ID
- **DELETE /quizzes/:userId/:quizId**: Delete a quiz for a user by ID

### User Quiz Endpoints

- **GET /user_quizzes/:userId**: Get all user quizzes by user ID
- **GET /user_quizzes/:userId/:quizId**: Get one user quiz by user ID and quiz ID
- **POST /user_quizzes/:userId**: Create a user quiz
- **PUT /user_quizzes/:userId/:quizId**: Update a user quiz
- **DELETE /user_quizzes/:userId/:quizId**: Delete a user quiz

### User Endpoints

- **POST /users/register**: Register a new user
- **POST /users/login**: Authenticate user login
- **GET /users/:id**: Get user by ID
- **PUT /users/:id**: Update user by ID
- **DELETE /users/:id**: Delete user by ID

## Screenshots

No screenshots available.

## Lessons Learned & Next Steps

During the development process, attempts were made to implement socket functionality for real-time updates, but it was unsuccessful.

### Lessons Learned
- Importance of thorough planning and testing for implementing advanced functionalities like sockets
- Consideration of alternative approaches for real-time updates

### Next Steps
- Further investigation and implementation of socket functionality
- Enhance API documentation and error handling
- Implement additional features such as user roles and leaderboard

## Frontend Repository

[Frontend Repository](<https://github.com/mashalnaeem/mashal-naeem-quizit>)

