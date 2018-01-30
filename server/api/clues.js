const router = require("express").Router()
const { Clue, UserTeamClueStatus } = require("../db/models")
const isMemberOfTeam = require("../isMemberOfTeam")
const vision = require("@google-cloud/vision")
const client = new vision.ImageAnnotatorClient()

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

router.post("/:teamId/verifyClue", (req, res, next) => {
  const clue = req.clues.filter(clue => clue.userId === req.user.id)
  const { imageUrl, geolocation } = req.body

  client
    .labelDetection(imageUrl)
    .then(results => {
      const labels = results[0].labelAnnotations

      console.log("Labels: ")
      labels.forEach(label => console.log(label.description))
      res.send(labels)
    })
    .catch(next)
})
