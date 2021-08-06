// add middlewares here related to actions
module.exports = {
    requiredBody
}

function requiredBody(req, res, next) {
    if(!req.body) {
        res.status(400)
    }
    next()
}
