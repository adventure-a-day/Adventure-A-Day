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
    Message.create(req.body)
    .then(messages => res.json(messages))
    .catch(next)
})

