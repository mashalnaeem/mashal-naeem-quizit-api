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
npm instal knex mysql2
npx knex migrate:latest
npx knex seed:run
```
# API References

## Quiz Endpoints
- **GET /quizzes**: Get all quizzes from the database.
- **GET /quizzes/:id**: Get a specific quiz by its ID.
- **GET /quizzes/:id/questions**: Get all questions for a specific quiz.
- **POST /quizzes/:userId**: Create a new quiz for a user.
- **PUT /quizzes/:userId/:quizId**: Update an existing quiz for a user by its ID.
- **DELETE /quizzes/:userId/:quizId**: Delete a quiz for a user by its ID.

## User Quiz Endpoints
- **GET /user_quizzes/:userId**: Get all user quizzes by user ID.
- **GET /user_quizzes/:userId/:quizId**: Get a specific user quiz by user ID and quiz ID.
- **POST /user_quizzes/:userId**: Create a user quiz.
- **PUT /user_quizzes/:userId/:quizId**: Update a user quiz.
- **DELETE /user_quizzes/:userId/:quizId**: Delete a user quiz.

## User Endpoints
- **POST /users/register**: Register a new user.
- **POST /users/login**: Authenticate user login.
- **GET /users/:id**: Get user by ID.
- **PUT /users/:id**: Update user by ID.
- **DELETE /users/:id**: Delete user by ID.

# Screenshots

No screenshots available.

# Lessons Learned & Next Steps

During the development process, I encountered challenges with running seed files due to foreign key constraints. As a workaround, I had to run each seed file individually, starting with the users file and then the user quizzes file.

I also faced difficulties with implementing socket functionality for real-time updates. Despite attempts, I encountered issues with establishing a connection and transmitting data effectively. However, I am committed to resolving these issues and continue to work towards implementing this feature.

Additionally, I aim to enhance the user experience by implementing the following features:
- Users will have the ability to upload and set thumbnail avatars for their profiles.
- Users can customize cover photos for their quizzes, adding a personal touch to their creations.
- Implement privacy settings, allowing users to dictate the visibility of their quizzes and specify which users or user types can access them.

## Lessons Learned
- Importance of understanding database constraints and their impact on seeding data.
- Challenges involved in implementing advanced functionalities like sockets.
- Flexibility in adapting to challenges and finding alternative solutions.

## Next Steps
- Further investigation and implementation of socket functionality.
- Enhance API documentation and error handling.
- Implement additional features such as user roles and leaderboard.


# Frontend Repository

[Frontend Repository](https://github.com/mashalnaeem/mashal-naeem-quizit)



