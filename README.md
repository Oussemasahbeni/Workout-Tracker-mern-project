# Workout Tracker MERN Project

## Overview

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) project that allows users to track their workouts. Users can log exercises, view their workout history, and monitor their progress over time.


## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)


## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB instance (local or remote)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Oussemasahbeni/Workout-Tracker-mern-project.git
    cd Workout-Tracker-mern-project
    ```

2. **Install dependencies for the server and client:**

    ```bash
    # Install server dependencies
    cd backend
    npm install

    # Install client dependencies
    cd frontend
    npm install
    ```

3. **Configure environment variables:**

    - Create a `.env` file in the `server` directory.
    - And feel free to dm for the env variables

4. **Run the application:**

    ```bash
    # Run server
    cd backend
    npm run dev

    # Run client
    cd frontend
    npm start
    ```

5. **Run the tests:**

    ```bash
    # E2E testind and component testing
    cd frontend
    npm test  or npx cypress
    

    # Integarion testing
    cd frontend
    newman run MERN_APP.postman_collection.json

    # Static Testing
     cd frontend or cd backend
     npx eslint .

    #load testing :
     cd frontend
     artillery run loadtest.yml
    ```

5. **Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.**


