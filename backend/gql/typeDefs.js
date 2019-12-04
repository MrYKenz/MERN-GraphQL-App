const gql = require('graphql-tag'); // apollo-server dependancy

module.exports = gql`
    type Post {
        id: ID!
        title: String!
        body: String!
        username: String!
        createdAt: String # need fix .toISOSting()
    }
    type User {
        id: ID!
        username: String!
        token: String! 
        email: String!
        createdAt: String
    }
    input Register { # gql argument createUser(register)
        username: String!
        password: String!
        email: String!
    }

    type Query {
        getPosts: [Post]
    }
    type Mutation { 
        createUser(register: Register): User! # create user with Register input
        loginUser(username: String!, password: String!): User! 
    }
`;