const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server'); // throws graphql error with payload object errors

const User = require('../../models/User');
const { validateRegister, validateLogin } = require('../../validation')

module.exports = {
    Mutation: {
        async createUser(parent, args) {
            // parent is previous resolver result - none so undefined
            // args is register gql argument with all its fields
            let { register: { username, password, email} } = args; // destructure register input
            // validate register input with validation 
            const { valid, errors } = validateRegister(username, password, email);
            if (!valid) {
                throw new UserInputError('Validation Error', { errors });
            }
            // check if username is already taken in DB
            const userExists = await User.findOne({ username });
            if (userExists) {
                throw new UserInputError('User exists', { errors: {username: 'Username already taken'}}); 
            }
            // hash password
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
            const token = jwt.sign({id: res.id, email: res.email, username: res.username}, 
                process.env.KEY, {expiresIn: "6h"});
            // return User MongoDB Document and MongoDB ID // jwt is retunred but not stored in DB
            return { ...res._doc, id: res._id, token }
        },
        async loginUser (parent, args) {
            let { login: { username, password } } = args;
            const { valid, errors } = validateLogin(username, password);
            if (!valid) {
                throw new UserInputError('Login Error', {errors})
            }
            // fecth User from DB using username
            const user = await User.findOne({ username });
            // if username doesn't match user in DB
            if (!user) {
                throw new UserInputError('User not found', { errors: {username: 'User not found'}});
            }
            // match hashed password with user password from DB
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                throw new UserInputError('Password Incorrect', { errors: {password: 'Password Incorrect'}});
            }
            // create jwt to be returned but not stored
            const token = jwt.sign({id: user.id, email: user.email, username: user.username}, 
                process.env.KEY, {expiresIn: "2h"});
            // return User MongoDB Document and MongoDB ID // jwt is retunred but not stored in DB
            return { ...user._doc, id: user._id, token } 
        }
    }
}