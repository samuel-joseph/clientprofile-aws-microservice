-------------------------------------SETTING UP-----------------------------------

touch server.js
npm init -y
npm i express sequelize sequelize-cli mysql2
npx sequelize init
npm install --save pg pg-hstore

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
    - defines the Model Client (username,password)
    - defines the association of Client (hasMany PersonalFund, hasOne UserProfile)
  - index.js
    - wraps all the models into one Object db
    - module.exports = db
  - portfolio.js
    - defines Model PersonalFund (fundKey)
    - defines the association of PersonalFund (belongsTo Client)
  - profile.js
    - defines Model UserProfile (firstName, lastName, email, birthdate, age)
    - defines the association of UserProfile (belongsTo Client)

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

  - http://localhost:3000/client
    - a POST method
    - creates a new client

  - http://localhost:3000/client
    - a GET method
    - returns all the clients field

  - http://localhost:3000/:id
    - a GET method
    - returns a specific client according to his id
    - returns Client, Profile and Portfolio

  - http://localhost:3000/client/:id
    - a DELETE method
    - deletes a specific client according to his id

  - http://localhost:3000/client/:id
    - a PUT method
    - Updates the clients properties according to the body that's been given by the user


PORTFOLIO
  - ./routes/portfolio-routes.js

  - http://localhost:3000/portfolio
    - a POST method
    - creates a new portfolio 
    - contains only fundKey property which references the mutual fund microservice fund id.

  - http://localhost:3000/portfolio/:id
    - a GET method
    - returns all the portfolios field of user :id

  - http://localhost:3000/portfolio/:clientId/:id
    - a GET method
    - returns a one portfolio of client :clientId targeting specific portfolio :id

  - http://localhost:3000/portfolio/:clientId/:id
    - a DELETE method
    - deletes one portfolio of client :clientId targeting speicif porfolio :id


PROFILE
  - ./routes/profile-routes.js

  - http://localhost:3000/profile
    - a POST method
    - creates a new profile 
    - contains  
      - firstName
      - lastName
      - email
      - birthdate
      - age
      - ClientId (which has to reference the id of Client)

  - http://localhost:3000/profile/:id
    - a GET method
    - the req.params.id should reference the "Client ID" and not the profile id
    - also returns the Client field

  - http://localhost:3000/profile/:clientID
    - a PUT method
    - Updates the clients profile according to the body that's been given by the user