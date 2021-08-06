// add middlewares here related to projects
const Projects = require('../projects/projects-model')

module.exports = {
    requiredBody,
    validationProjectId
}

function requiredBody(req, res, next) {
    const { name, description } = req.body
    if(!name || !description ){
        res.status(400).json({
            message: "please provide both a name and description"
        })
    } else {
        next()
    }
}


function validationProjectId(req, res, next) {
    const { id } = req.params
    Projects.get(id)
    .then(project => {
        if(!project){
            res.status(404).json({
                message: "no action with given id found"
            })
        } else {
            req.project = project
            next()
        }
    })
    .catch(next)
}
