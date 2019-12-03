const Post = require('../../models/Post');

module.exports = {
    Query: {
        async getPosts() {
            try {
                // find() to fetch posts from MongoDB
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}