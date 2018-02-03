const router = require('express').Router()
const {Photo} = require('../db/models')
module.exports = router

router.get('/:teamId', (req, res, next) => {
    Photo.findAll({
        where: {
            teamId: req.params.teamId
        }
    })
    .then(photos => res.json(photos))
    .catch(next)
})

router.post('/:teamId', (req, res, next) => {
    // in req.body: url, teamId, userId
    Photo.create(req.body)
    .then(photo => res.json(photo))
    .catch(next)
})