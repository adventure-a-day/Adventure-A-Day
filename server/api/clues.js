const router = require("express").Router()
const { Clue, UserTeamClueStatus } = require("../db/models")
const isMemberOfTeam = require("../isMemberOfTeam")

module.exports = router

router.param("teamId", (req, res, next, teamId) => {
  UserTeamClueStatus.findAll({ where: { teamId }, include: [Clue] })
    .then(clues => {
      req.clues = clues
      next()
    })
    .catch(next)
})

router.get("/:teamId/completedClues", isMemberOfTeam, (req, res, next) => {
  const completed = req.clues.filter(clue => clue.status === "completed")
  res.json(completed)
})

router.get("/:teamId/assignedClues", isMemberOfTeam, (req, res, next) => {
  const assigned = req.clues.filter(clue => clue.status === "assigned")
  res.json(assigned)
})
