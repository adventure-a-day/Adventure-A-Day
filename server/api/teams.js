const router = require("express").Router()
const isMemberOfTeam = require("../isMemberOfTeam")
const { Team, User } = require("../db/models")
module.exports = router

router.get("/", (req, res, next) => {
  User.findById(req.user.id, {
    include: [{ model: Team }]
  })
    .then(user => res.json(user.teams))
    .catch(next)
})

router.get("/:teamId", isMemberOfTeam, (req, res, next) => {
  const teamId = req.params.teamId
  Team.findById(teamId)
    .then(team => res.json(team))
    .catch(next)
})

router.get("/:teamId/teamMembers", isMemberOfTeam, (req, res, next) => {
  const teamId = req.params.teamId
  Team.findById(teamId, {
    include: [User.scope("display")]
  })
    .then(team => res.json(team.users))
    .catch(next)
})

router.post("/", (req, res, next) => {
  // in req.body: name
  Team.create(req.body)
    .then(createdTeam => res.json(createdTeam))
    .catch(next)
})

router.delete("/:teamId", isMemberOfTeam, (req, res, next) => {
  const teamId = req.params.teamId
  Team.destroy({ where: { id: teamId } })
    .then(deleteSuccess => res.sendStatus(204))
    .catch(next)
})
