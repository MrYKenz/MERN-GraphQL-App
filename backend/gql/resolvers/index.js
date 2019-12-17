const postResolvers = require('./posts');
const userResolvers = require('./users');
const jobResolvers = require('./jobs');

module.exports = {
    Query: {
        ...postResolvers.Query,
        ...jobResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation
    }
}