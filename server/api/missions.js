const router = require('express').Router()
const {Mission, Clue} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Mission.findAll()
    .then(missions => res.json(missions))
    .catch(next)
})

router.get('/:missionId', (req, res, next) => {
    const missionId = req.params.missionId
    Mission.findOne({where: {id: missionId}, include: [{model: Clue}]})
    .then(mission => res.json(mission))
    .catch(next)
})
