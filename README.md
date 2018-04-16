# Litho Reservation App

A Simple reservation recording system.

## Getting Started

* Clone Repo
* Install Dependencies - yarn install
* Run Mongod and Mongo
* Run the App - yarn start

### Routes 

* GET /reservations - returns list of all reservations
* POST /reservation - save a reservation
* GET /reservations/ID - return reservation object by ID
* GET /reservations?hotelName=X&arrivalDate=Y&departureDate=Z – Returns all reservations that match (date format should be YY-MM-DD)

### User Interface

Once app is running. Create your reservation at localhost:3000

![ui](/screenshots/ui.png)

Query your reservations through GraphiQL localhost:3000/graphiql

![graphiql](/screenshots/graphiql.png)

## Built With

* [React](https://github.com/facebook/React) - A declarative, efficient, and flexible JavaScript library for building user interfaces. 
* [Mongoose](https://github.com/Automattic/mongoose) - MongoDB object modeling designed to work in an asynchronous environment. 
* [GraphQL](https://github.com/facebook/graphql) - GraphQL is a query language and execution engine tied to any backend service.
* [Apollo GraphQL](https://github.com/apollographql) - A community building flexible open source tools for GraphQL
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js

## Authors

* **Harry Cam** - https://github.com/hcam05

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/hcam05/litho/blob/master/LICENSE) file for details
