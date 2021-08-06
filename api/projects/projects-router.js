// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model');
const custom = require('./projects-middleware')

router.get('/', () => {
    return []
})

router.post('/', custom.requiredBody ,(req, res) => {
    Project.insert(req.body).then((data) => {
        if(!data) {
            return res.status(400);
        }
        return data
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Project.get(id).then((data) => {
        if(!data) {
            return res.status(404)
        }
        return data
    })
})

router.put('/:id', custom.requiredBody, (req, res) => {
    const { id } = req.params
    Project.update(id, req.body).then((data) => {
        if(!data) {
            return res.status(404)
        }
        return data
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Project.remove(id).then((data) => {
        if(!data) {
            return res.status(404)
        }
        return true
    })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    Project.getProjectActions(id).then((data) => {        
        if(!data) {
            return res.status(404)
        }
        if(data.length == 0) {
            return []
        } else {
            return data
        }
    })
})



module.exports = router