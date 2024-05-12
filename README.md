# TTB-intern

This project utilized Node.js and Express.js to build a backend user management system, and Knex.js to query the database and Objection.js, an Object-Relational Mapping (ORM) framework, to interact with the database.

There are 3 main parts of the system
1. A database that holds user information
2. Routes to the CRUD Operations and RESTful API activities
3. Utility functions for hashing to secure data

There are 4 folders in this project
1. database
    1. The database is stored as user_information.sql
    2. Please find README.md inside the folder for further information

2. models 
    1. users_database.js acquired the knexConfig from knexfile.js and initialize as a obejct by Objection.js

3. routes
    1. userRoute.js exports the routes for RESTful API and CRUD Operations
    2. Please Find README.md inside the folder for furhter information

4. utils
    1. hashPassword.js exports the hashPassword and verifyPasswordWithHash function (verifyPasswordWithHash is never used in this project)
    2. hashUserId exports the hashUserId function

app.js -- The main part of the project, importing the routes and setting up the JSON Middleware

config.js -- The port is set to 5000

knexfile.js -- Knex Configuration, setting Knex.js connection to a MySQL database -- user_information