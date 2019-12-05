const { ApolloServer } = require('apollo-server'); // runs off express
const mongoose = require('mongoose');

require('dotenv').config(); // environment variables
const typeDefs = require('./gql/typeDefs'); // type defintions file in subdirectory
const resolvers = require('./gql/resolvers'); // index.js in gql resolvers subdirectory

// connect to DB
mongoose
    .connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("Connected to MongoDB"));

// ApolloServer constructor with GQL Schema Definitions and Resolvers
// Context argument takes request from Express and forwards it to Context
const app = new ApolloServer({typeDefs, resolvers, context: ({req})=>({req})});

// launch webserver on port 5000 // use prcoess.env.PORT ??
app.listen({port:5000})
    .then(res => console.log(`Server on port: ${res.port}`));