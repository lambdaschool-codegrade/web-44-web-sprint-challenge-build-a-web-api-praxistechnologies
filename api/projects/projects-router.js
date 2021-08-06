// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model');
const custom = require('./projects-middleware')

router.get('/', (req, res) => {
    Project.get()
    .then(projects => {
        res.status(200).json(projects)
    })    
})

router.post('/', custom.requiredBody ,(req, res, next) => {
    const { name, description, completed } = req.body
    Project.insert({ name, description, completed }).then((data) => {
        res.status(200).json(data)
    }).catch(next)
})

router.get('/:id', custom.validationProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.put('/:id', custom.requiredBody, (req, res, next) => {
    const { id } = req.params
    const {name, description, completed} = req.body
    if("completed" in req.body){
        Project.update(id, {name, description, completed})
        .then(updatedProject => {
            res.status(200).json(updatedProject)
        }).catch(next)        
    } else {
        res.status(400).json({
            message: "missing name, description, and/or completed fields"
        })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params    
    Project.get(id).then(project => {
        if(!project) {
            res.status(404).json({
                message: "Not found"
            })
        } else {
            Project.remove(id).then(() => {
                res.status(200).json({
                    message: "success"
                })
            })            
        }
    })   
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    Project.getProjectActions(id).then((data) => {        
        if(!data) {
            return res.status(404)
        } else {
            return res.status(200).json(data)
        }
    })
})



module.exports = router