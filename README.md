# Project Name
# Crypto Creatures

## Features
[x] Create a Nodejs (NestJS) project and model the Information that will be stored. All this information should be stored in a  MongoDB Database.

[x] Make all functionalities to Create/Read/Update/Delete monsters from your system, thinking this will be consumed by two different clients:
An admin dashboard (read/write privileges) can only be used by Bored mike
A public view of the Monster List (read privileges) that everyone can view

[] Apart from Bored Mike, all the Elixir employees gather every Friday together to view the list of latest discoveries from Bored Mike.


[] Make the functionality to Add/Remove Gold Balance from a Monster. Here we will put a close eye on how reliable your system is.
 - The Gold Balance is quite a system, the Elixir employers vote raising their hands on the monster they like most, and every week the CEO of Elixir (and only him) gives some Gold to the winning monster. 
 - Bored Mike can then remove some gold from the monsters he found in order to capture more monsters.



## Requirements
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

    The application will be available at `http://localhost:3000` by default.

## Usage




