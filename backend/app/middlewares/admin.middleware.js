const { User } = require("../models/user.model")
async function admin(req, res, next) {
    if (req.User.category !== 'ADMIN')
        return res.status(403).send({ message: 'You don\'t have access' })
    req.User = User
    next()
}
module.exports.admin = admin