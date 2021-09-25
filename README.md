# Project Fair Management System

## A Project Fair Management System platform built with the MERN stack & Redux.

![screenshot](https://images.pexels.com/photos/9675566/pexels-photo-9675566.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)

## Features

- User Authentication & Authorization.
- Apply For Project Fair
- Manage Admin
- Manage Convenor
- Create. Edit, Delete Sessions.
- Automatic Result Publish online.

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'

```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

user@diu.edu.bd (Student)
abc123

convener@diu.edu.bd (Convener)
abc123

admin@diu.edu.bd (Admin)
abc123

judge@diu.edu.bd (Judge)
abc123

```
