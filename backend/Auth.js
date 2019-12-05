const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');


module.exports = (context)  => {
    try {
        const token = context.req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.KEY);
        return decoded;
    } catch (err) {
        throw new AuthenticationError('Not authorised or session expired')
    }
}