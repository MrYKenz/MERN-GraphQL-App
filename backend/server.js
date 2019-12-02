const { ApolloServer } = require('apollo-server'); // runs off express
const gql = require('graphql-tag'); // apollo-server dependancy
const mongoose = require('mongoose');

require('dotenv').config(); // environment variables
const Post = require('./models/Post');

// connect to DB
mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("Connected to MongoDB"));

// graphql schema
const typeDefs = gql`
    type Query {
        test: String!
    }
`
const resolvers = {
    Query: {
        test: () => 'testing...'
    }
}

// initiate ApolloServer
const app = new ApolloServer({typeDefs, resolvers});

// listen on port 5000 // prcoess.env.PORT
app.listen({port:5000})
    .then(res => console.log(`Server on port: ${res.port}`));