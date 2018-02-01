const router = require('express').Router()
const {Message} = require('../db/models')
const isMemberOfTeam = require("../isMemberOfTeam")
module.exports = router

router.get('/:teamId', isMemberOfTeam, (req, res, next) => {
    Message.findAll({
        where: {
            teamId: req.params.teamId
        }
    })
    .then(messages => res.json(messages))
    .catch(next)
})

router.post('/:teamId', isMemberOfTeam, (req, res, next) => {
    // in req.body: text, teamId, userId
    Message.create(req.body)
    .then(messages => res.json(messages))
    .catch(next)
})

