const router = require("express").Router()
const { Clue, Team, User, UserTeamClueStatus } = require("../db/models")
const isMemberOfTeam = require("../isMemberOfTeam")
const vision = require("@google-cloud/vision")
const client = new vision.ImageAnnotatorClient()
const webpush = require("../webpush")

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
  const clue = req.clues.find(foundClue => foundClue.userId === req.user.id)
  const { imageUrl } = req.body
  console.log(`

  =============================================================================
  IMAGEURL: ${req.body}
  ============================================================================

  `)

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

  client
    .labelDetection(imageUrl)
    .then(results => {
      const labels = results[0].labelAnnotations
      let foundMatch = []
      if (labels.length) {
        labels.forEach(label => {
          foundMatch.push(
            clue.clue.tags.find(
              tag => tag.toLowerCase() === label.description.toLowerCase()
            )
          )
        })
        if (foundMatch.length >= 2) {
          res.send("Found a match!")
          Team.findById(req.teamId, {
            include: [User.scope("subscription")]
          }).then(team => {
            team.users.forEach(user => {
              if (user.id !== req.user.id) {
                user.subscriptions.forEach(sub => {
                  webpush.sendNotification(sub.info, {
                    title: `${req.user.username} has completed their task!`
                  })
                })
              }
            })
          })
        } else {
          res.send("Better try harder!")
        }
      }
    })
    .catch(next)
})
