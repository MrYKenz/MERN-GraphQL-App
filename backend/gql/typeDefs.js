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
    # gql arguments e.g. createUser(register: {username, password})
    input Register { 
        username: String!
        password: String!
        email: String!
    }
    input Login {
        username: String!
        password: String!
    }
    # gql query and mutation types
    type Query {
        getPosts: [Post]
        getPost(id: ID!): Post
        getJobs(key: String!): String
    }
    type Mutation { 
        createUser(register: Register): User! # create user with Register input
        loginUser(login: Login): User! 
        createPost(title: String!, body: String!): Post!
        deletePost(id: ID!): String!
    }
`;