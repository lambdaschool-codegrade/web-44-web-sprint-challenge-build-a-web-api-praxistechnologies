// add middlewares here related to projects
module.exports = {
    requiredBody
}

function requiredBody(req, res, next) {
    if(!req.body) {
        res.status(400)
    }
    next()
}
