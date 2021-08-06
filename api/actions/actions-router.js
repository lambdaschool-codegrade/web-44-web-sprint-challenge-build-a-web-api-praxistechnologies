// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const {get, insert, update, remove} = require('./actions-model');
const { requiredBody, validationActionId} = require('./actions-middlware')

router.get('/', (req, res, next) => {
    get().then((actions) => {        
        return res.status(200).json(actions)
    }).catch(next)
})

router.get('/:id', validationActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', requiredBody, (req, res, next) => {
    const { project_id, description, notes, completed} = req.body
    insert({project_id, description, notes, completed}).then((newAction) => {
        res.status(200).json(newAction)
    }).catch(next)
})

router.put('/:id', requiredBody, (req, res, next) => {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body
    update(id, { project_id, description, notes, completed }).then((updatedAction) => {        
        res.status(200).json(updatedAction)
    }).catch(next)    
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    get(id).then(action => {
        if(!action) {
            res.status(404).json({
                message: "Not found"
            })
        } else {
            remove(id).then(() => {
                res.status(200).json({
                    message: "success"
                })
            })            
        }
    })    
})

module.exports = router