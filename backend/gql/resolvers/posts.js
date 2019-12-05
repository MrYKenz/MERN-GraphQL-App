const Post = require('../../models/Post');
const Auth = require('../../Auth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt: -1});
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
        // context used to pass authorization header for JWT
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
        },
        async deletePost(parent, args, context) {
            let { id } = args;
            const user = Auth(context);

            try {
                const post = await Post.findById(id);
                if (user.username === post.username) {
                    await post.delete();
                    return "Post deleted!"
                } else {
                    return "You do not have permission to delete this post"
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}