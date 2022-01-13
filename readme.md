-------------------------------------SETTING UP-----------------------------------

- touch server.js
- npm init -y
- npm i express sequelize sequelize-cli mysql2
- npx sequelize init
- npm install --save pg pg-hstore

--------------------------------DIRECTORIES DEFINITION---------------------------

config
- contains a single file that resides all hosting etc.
- contents
  - config.json
    - contains hostname, username, password, database, dialect

models
- contains all models that defines every field
- contents
  - client.js
    - defines the Model Customer (user_id)
    - defines the association of Client (hasMany CustomerPortfolio, hasOne CustomerProfile)
  - index.js
    - wraps all the models into one Object db
    - module.exports = db
  - portfolio.js
    - defines Model CustomerPortfolio (fundKey)
    - defines the association of CustomerPortfolio (belongsTo Customer)
  - profile.js
    - defines Model CustomerProfile (firstName, lastName, email, birthdate, age)
    - defines the association of CustomerProfile (belongsTo Customer)

- node_modules

- routes
  - contains routes of every model
  - will be defined further in ROUTES section
  - contains
    - client-routes
    - portfolio-routes
    - profile-routes

- server.js  
  - this is the file that will run the moment this microservices runs

----------------------------------ROUTES--------------------------------------

CLIENT
  - ./routes/client-routes.js

  /customer
    - a POST method
    - creates a new user

  /customer
    - a GET method
    - returns all the users field

  /customer/:id
    - a GET method
    - returns a specific user according to his id
    - returns user, Profile and Portfolio

  /customer/:id
    - a DELETE method
    - deletes a specific user according to his id

  /customer/:id
    - a PUT method
    - Updates the users properties according to the body that's been given by the user


PORTFOLIO
  - ./routes/portfolio-routes.js

  /portfolio
    - a POST method
    - creates a new portfolio 
    - contains only fundKey property which references the mutual fund microservice fund id.

  /portfolio/:id
    - a GET method
    - returns all the portfolios field of user :id

  /portfolio/:customer/:id
    - a GET method
    - returns a one portfolio of client :clientId targeting specific portfolio :id

  /portfolio/:customerId/:id
    - a DELETE method
    - deletes one portfolio of client :clientId targeting speicif porfolio :id


PROFILE
  - ./routes/profile-routes.js

  /profile
    - a POST method
    - creates a new profile 
    - contains  
      - firstName
      - lastName
      - email
      - birthdate
      - age
      - ClientId (which has to reference the id of Client)

  /profile/:id
    - a GET method
    - the req.params.id should reference the "Client ID" and not the profile id
    - also returns the Client field

  /profile/:id
    - a PUT method
    - Updates the clients profile according to the body that's been given by the user
