const router = require("express").Router()
const Op = require("sequelize").Op
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
  Team.create({ name: req.body.name })
    .then(createdTeam => {
      createdTeam.addUser(req.user)
      createdTeam.addMission(1)
      res.json(createdTeam)
    })
    .catch(next)
})

router.post("/:teamId/teamMembers", isMemberOfTeam, (req, res, next) => {
  const { targetUser } = req.body
  User.findOne({
    where: { [Op.or]: [{ email: targetUser }, { userName: targetUser }] }
  })
    .then(foundUser => {
      if (foundUser) {
        if (foundUser.hasTeam(req.params.teamid)) {
          throw new Error("User Already Added")
        }
        return foundUser.addTeam(req.params.teamId)
      } else {
        let err = new Error("User Not Found")
        err.status = 404
        throw err
      }
    })
    .then(() => res.send("User Added"))
    .catch(next)
})

router.delete("/:teamId", isMemberOfTeam, (req, res, next) => {
  const teamId = req.params.teamId
  Team.destroy({ where: { id: teamId } })
    .then(deleteSuccess => res.sendStatus(204))
    .catch(next)
})
