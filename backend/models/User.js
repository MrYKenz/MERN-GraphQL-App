const { model, Schema } = require('mongoose');

// Don't need required fields as gql can do this
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
});

module.exports = model('User', userSchema);