const router = require("express").Router()
const Op = require("sequelize").Op
const isMemberOfTeam = require("../isMemberOfTeam")
const { Team, User, Clue, UserTeamClueStatus } = require("../db/models")
const webpush = require("../webpush")
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
  // in req.body: name, mission
  const { missionId, name } = req.body
  Team.create({ name, activeMission: true })
    .then(createdTeam => {
      createdTeam.addUser(req.user)
      createdTeam.addMission(missionId || 1)
      res.json(createdTeam)
      Clue.findAll({ where: { missionId } }).then(clues => {
        clues.forEach(clue =>
          UserTeamClueStatus.create({ clueId: clue.id, teamId: createdTeam.Id })
        )
      })
    })
    .catch(next)
})

router.get("/:teamId/assign", isMemberOfTeam, (req, res, next) => {
  let team, users
  let assignedClues = []
  UserTeamClueStatus.findAll({
    where: { teamId: req.params.teamId, status: "assigned" }
  })
    .then(clues => {
      if (clues.length) {
        let err = new Error()
        err.message = "Team Still has Adventures!"
        err.status = 401
        throw err
      }
    })
    .then(
      Team.findById(req.params.teamId, {
        include: [{ model: User.scope("subscriptions") }]
      })
    )
    .then(foundTeam => {
      team = foundTeam
      users = { team }
      UserTeamClueStatus.findAll({
        where: { status: "unassigned", teamId: team.id },
        include: [Clue]
      })
    })
    .then(clues => {
      if (clues.length >= users.length) {
        users.forEach(user => {
          let clueIndex = Math.floor(Math.random() * clues.length)
          const clue = clues[clueIndex]
          clues = clues.filter((clu, index) => index !== clueIndex)
          clue
            .update({ userId: user.id, status: "assigned" })
            .then(() => {
              assignedClues.push(clue)
              user.subscriptions.forEach(sub =>
                webpush
                  .sendNotification(
                    sub.info,
                    JSON.stringify({
                      title: "New Task Received!",
                      body: clue.clue.prompt,
                      clue: clue.clue
                    })
                  )
                  .catch(() => sub.destroy())
              )
            })
            .catch(next)
        })
      }
    })
    .catch(next)
  res.json(assignedClues)
})

router.post("/:teamId/teamMembers", isMemberOfTeam, (req, res, next) => {
  const { targetUser } = req.body
  User.findOne({
    where: { [Op.or]: [{ email: targetUser }, { userName: targetUser }] }
  })
    .then(foundUser => {
      if (foundUser) {
        foundUser
          .hasTeam(req.params.teamId)
          .then(hasTeam => {
            if (hasTeam) {
              res.send("User Already Added")
            } else {
              foundUser.addTeam(req.params.teamId)
              res.json(foundUser)
            }
          })
          .catch(next)
      } else {
        res.send("User Not Found")
      }
    })
    .catch(next)
})

router.delete("/:teamId", isMemberOfTeam, (req, res, next) => {
  const teamId = req.params.teamId
  Team.destroy({ where: { id: teamId } })
    .then(() => res.sendStatus(204))
    .catch(next)
})
