const { ApolloServer } = require('apollo-server'); // runs off express
const mongoose = require('mongoose');

require('dotenv').config(); // environment variables
const typeDefs = require('./gql/typeDefs');
const resolvers = require('./gql/resolvers');

// connect to DB
mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("Connected to MongoDB"));

// ApolloServer constructor with GQL Schema Definitions and Resolvers
// Context argument takes request from Express and forwards it to Context
const app = new ApolloServer({typeDefs, resolvers, context: ({req})=>({req})});

// launch webserver on port 5000 // use prcoess.env.PORT ??
app.listen({port:5000})
    .then(res => console.log(`Server on port: ${res.port}`));