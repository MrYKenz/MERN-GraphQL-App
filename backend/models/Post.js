const { model, Schema } = require('mongoose');

// Don't need required fields as gql can do this
const postSchema = new Schema({
    title: String,
    body: String,
    username: String,
    createdAt: Date,
    comments: [
        {
            body: String,
            username: String,
            createdAt: Date
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports('Post', postSchema);