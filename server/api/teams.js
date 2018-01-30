const router = require("express").Router()
const { Team, User } = require("../db/models")
module.exports = router

router.get("/", (req, res, next) => {
  Team.findAll({
    include: [{ model: User }]
  })
    .then(teams => res.json(teams))
    .catch(next)
})

router.get("/:teamId", (req, res, next) => {
  const teamId = req.params.teamId
  Team.findById(teamId)
    .then(team => res.json(team))
    .catch(next)
})

router.post("/",  (req, res, next) => {
  Team.create(req.body)
    .then(createdTeam => res.json(createdTeam))
    .catch(next)
})

router.delete("/:teamId", (req, res, next) => {
  const teamId = req.params.teamId
   Team.destroy({where: {id: teamId}})
    .then(deleteSuccess => res.sendStatus(204))
    .catch(next)
})
