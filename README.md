
# GEN AI API

  

## Description

  

GEN AI API built with TypeScript, Express, and TypeORM.

  

It has all the logic for our GEN AI App except the chat logic.

  

## Technologies Used

  

- TypeScript

- Node.js

- Express.js

- TypeORM

- PostgreSQL

- Docker

- JWT (JSON Web Tokens)

- bcrypt (for password hashing)

  

## Features

  

- User registration with password hashing

- User login with JWT authentication

- CRUD operations for user management

- Docker support for easy deployment

  

## Getting Started

  

### Prerequisites

  

- Node.js (v20 or higher)

- Docker and Docker Compose

- PostgreSQL

  

### Environment Variables

  

Create a `.env` file in the root directory of the project with the following variables:

  

```plaintext

POSTGRES_USER=myuser

POSTGRES_PASSWORD=mypassword

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=1h

REFRESH_TOKEN_SECRET=your_refresh_token_secret

REFRESH_TOKEN_EXPIRES_IN=7d
```

  

## Installation

### Clone the repository
    git clone https://github.com/yourusername/user-management-api.git
    cd user-management-api
    
### Install dependencies
    npm ci

### Running the application locally
    docker-compose up --build

### Initiating dataset
The database will be automatically set up when the application starts. The  SQL script (`init_users.sql`) is included to initialize the `Users` table


