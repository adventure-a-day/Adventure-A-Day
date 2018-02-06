const router = require("express").Router()
const { Clue, Team, User, UserTeamClueStatus } = require("../db/models")
const isMemberOfTeam = require("../isMemberOfTeam")
const vision = require("@google-cloud/vision")
const client = new vision.ImageAnnotatorClient()
const webpush = require("../webpush")

module.exports = router

router.param("teamId", (req, res, next, teamId) => {
  req.teamId = teamId
  UserTeamClueStatus.findAll({ where: { teamId }, include: [Clue] })
    .then(clues => {
      req.clues = clues
      next()
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
    UserTeamClueStatus.findAll({ where: { userId: req.user.id, status: "assigned" }, include: [Clue] })
    .then(clues => {
      res.json(clues)
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
  const clue = req.clues
    .filter(foundClue => foundClue.status === "assigned")
    .find(foundClue => foundClue.userId === req.user.id)
  const { imageUrl } = req.body

  client
    .labelDetection(imageUrl)
    .then(results => {
      const labels = results[0].labelAnnotations
      let foundMatch = []
      if (labels.length) {
        labels.forEach(label => {
          let match = clue.clue.labels.find(
              tag => tag.toLowerCase() === label.description.toLowerCase()
            )
          if(match) foundMatch.push(match)
        })
        if (foundMatch.length >= 1) {
          res.send({ message: "Found a match!", success: true })
          clue.update({ status: "completed" })
          Team.findById(req.teamId, {
            include: [User.scope("subscriptions")]
          }).then(team => {
            team.users.forEach(user => {
              if (user.id !== req.user.id) {
                user.subscriptions.forEach(sub => {
                  webpush
                    .sendNotification(sub.info, {
                      title: `${req.user.username} has completed their task!`
                    })
                    .catch(() => sub.destroy())
                })
              }
            })
          })
        } else {
          res.send({ message: "Better try harder!", success: false })
        }
      } else {
        res.send({ message: "Picture Unrecognizeable", success: false })
      }
    })
    .catch(next)

  /**
   * THIS IS FOR WEB DETECTION
   */
  // client
  //   .webDetection(imageUrl)
  //   .then(results => {
  //     const webDetection = results[0].webDetection
  //     let foundMatch = []
  //     if (webDetection.webEntities.length) {
  //       webDetection.webEntities.forEach(webEntity => {
  //         foundMatch.push(
  //           clue.clue.tags.find(
  //             tag => tag.toLowerCase() === webEntity.description.toLowerCase()
  //           )
  //         )
  //         console.log(`  Description: ${webEntity.description}`)
  //       })
  //       if (foundMatch.length >= 2) {
  //         res.send("Found a match!")
  //       }
  //     }
  //   })
  //   .catch(err => {
  //     console.error("ERROR:", err)
  //   })
})
