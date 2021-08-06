// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const {get, insert, update, remove} = require('./actions-model');
const custom = require('./actions-middlware')

router.get('/', () => {
    return []
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log("id", id)
    const action = await get(id)
    if(!action) {
        return res.status(404)
    }
    return action    
})

router.post('/', custom.requiredBody, async (req, res) => {
    const action = await insert(req.body)
    if(!action) {
        return res.status(404)
    } 
    return action    
})

router.put('/:id', custom.requiredBody, async (req, res) => {
    const id = req.params.id;
    const updatedAction = await update(id, req.body);
    if(updatedAction) {
        return updatedAction;
    } else {
        return res.status(404);
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const action = await get(id)
    if(action) {
        remove(id)
    } else {
        return res.status(404)
    }
    return 
})

module.exports = router