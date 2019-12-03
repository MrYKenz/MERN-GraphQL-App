const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

module.exports = {
    Mutation: {
        async createUser(parent, args, context, info) {
            // parent is previous resolver result which = undefined
            // args is register gql argument with all its fields
            // context for gql contexts
            // info is the query metadata
            let {register:{username,password,email}} = args; // destructure
            password = await bcrypt.hash(password, 12);
            // define user with args and hashed password
            const newUser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });
            // save() to save users into MongoDB
            const res = await newUser.save();

            // create jwt to be returned but not stored
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, 
            process.env.KEY, {expiresIn: "6h"});
            // return User MongoDB Document and auto-generated id from User Model
            // jwt returned but not saved in MongoDB
            return { ...res._doc, id: res._id, token }
        }
    }
}