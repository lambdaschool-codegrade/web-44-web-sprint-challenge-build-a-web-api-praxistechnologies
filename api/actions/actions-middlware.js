
// add middlewares here related to actions

const Actions = require('./actions-model')


module.exports = {
    requiredBody,
    validationActionId
}

function validationActionId(req, res, next) {
    const { id } = req.params
    Actions.get(id)
    .then(action => {
        if(!action){
            res.status(404).json({
                message: "no action with given id found"
            })
        } else {
            req.action = action
            next()
        }
    })
    .catch(next)
}

function requiredBody(req, res, next) {
    const { project_id, description, notes } = req.body
    if(!project_id || !description || description.length > 128 || !notes) {
        res.status(400).json({
            message: "missing or invalid fields"
        })
    } else {
        next()
    }  
}

