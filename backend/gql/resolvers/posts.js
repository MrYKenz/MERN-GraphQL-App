const Post = require('../../models/Post');
const Auth = require('../../Auth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(parent, args) {
            let { id } = args;
            try {
                const post = await Post.findById(id);
                return post;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(parent, args, context) {
            let { title, body } = args;
            const user = Auth(context);

            const newPost = new Post({
                title,
                body,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();
            return post;
        }
    }
}