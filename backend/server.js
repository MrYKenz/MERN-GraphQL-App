const { ApolloServer } = require('apollo-server'); // runs off express
const mongoose = require('mongoose');

require('dotenv').config(); // environment variables
const typeDefs = require('./gql/typeDefs'); // type defintions file in subdirectory
const resolvers = require('./gql/resolvers'); // index.js in gql resolvers subdirectory
const cron = require('./worker/cron') // execute cronjobs

mongoose
    .connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Cannot connect to MongoDB"))

// ApolloServer constructor with GQL Schema Definitions and Resolvers
// Context argument takes request from Express and forwards it to Context
const app = new ApolloServer({typeDefs, resolvers, context: (req)=>(req)});

// launch webserver on port 5000 // use prcoess.env.PORT ??
app.listen({port: process.env.PORT || 5000})
    .then(res => console.log(`Server on port: ${res.port}`));