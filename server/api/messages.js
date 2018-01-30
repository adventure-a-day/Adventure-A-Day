const router = require('express').Router()
const {Message} = require('../db/models')
module.exports = router

router.get('/:teamId', (req, res, next) => {
    Message.findAll({
        where: {
            teamId: req.params.teamId
        }
    })
    .then(messages => res.json(messages))
    .catch(next)
})

router.post('/:teamId', (req, res, next) => {
    // in req.body: text, teamId, userId
    Message.create(req.body)
    .then(messages => res.json(messages))
    .catch(next)
})

