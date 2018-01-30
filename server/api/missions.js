const router = require('express').Router()
const {Mission} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Mission.findAll()
    .then(missions => res.json(missions))
    .catch(next)
})

router.get('/:missionId', (req, res, next) => {
    const missionId = req.params.missionId
    Mission.findById(missionId)
    .then(mission => res.json(mission))
    .catch(next)
})
