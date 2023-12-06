# Crypto Creatures

## Features
[x] Create a Nodejs (NestJS) project and model the Information that will be stored. All this information should be stored in a  MongoDB Database.

[x] Make all functionalities to Create/Read/Update/Delete monsters from your system, thinking this will be consumed by two different clients:
An admin dashboard (read/write privileges) can only be used by Bored mike
A public view of the Monster List (read privileges) that everyone can view

[x] Make the functionality to Add/Remove Gold Balance from a Monster. Here we will put a close eye on how reliable your system is.
 - The Gold Balance is quite a system, the Elixir employers vote raising their hands on the monster they like most, and every week the CEO of Elixir (and only him) gives some Gold to the winning monster. 
 - Bored Mike can then remove some gold from the monsters he found in order to capture more monsters.

## Requirements local
- Docker
- Docker Compose

## Project Setup with Docker

1. **Clone the Repository:**

    ```bash
    git clone git@github.com:pierslabs/crypto-creatures.git
    cd crypto-creatures
    ```

2. **Configure Environment Variables:**

   Copy the `.env.example` file to a new `.env` file and configure the variables as needed.

3. **Build and Run the Docker Containers:**

    ```bash
    docker-compose up --build
    ```

4. **Run app:**
    ```bash
    npm run start:dev
    ```

The application will be available at `http://localhost:3002` by default.

5. **Run tests:**
    ```bash
    npm run test
    ```

### Swagger
 - https://crypto-creatures.pedro-losas.com/api

#### Roles
1. Bored Mike
  ```bash
    name: 'Mike'
    password: '123456'
  ```
2. CEO
  ```bash
  name: "Ceo",
  password: "123456"
  ```
3. User
  ```bash
    name: 'User'
    password: '123456'
  ```

4. Anyone can create a user in Swagger at the auth/register endpoint

#### Usage
 - log in 
 - copy token 
 - check the 'Authorize' button, and paste token.


### Deployment of the Application in a Production Environment
The application has been successfully deployed in a production environment, specifically on a privately managed Virtual Private Server (VPS). Nginx has been configured as the web server, and PM2 has been employed as the process manager.   
I commonly use GitHub Actions for continuous deployment.