const { model, Schema } = require('mongoose');

// Don't need required fields as gql can do this
const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    createdAt: Date,
});

module.exports('User', userSchema);