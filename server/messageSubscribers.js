const { User, Team, Clue, UserTeamClueStatus } = require("./db/models")
const webpush = require("./webpush")

// Function to send Subscribers their messages
module.exports = () => {
  Team.findAll({
    where: { activeMission: true },
    include: [{ model: User.scope("subscriptions") }]
  })
    .then(teams =>
      teams.forEach(team => {
        const { users } = team
        UserTeamClueStatus.findAll({
          where: { status: "unassigned", teamId: team.id },
          include: [Clue]
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
                    user.subscriptions.forEach(sub =>
                      webpush.sendNotification(
                        sub.info,
                        JSON.stringify({
                          title: "New Task Received!",
                          body: clue.clue.prompt,
                          clue: clue.clue
                        })
                      )
                    )
                  })
                  .catch(console.error)
              })
            } else {
              users.forEach(user => {
                user.subscriptions.forEach(sub =>
                  webpush.sendNotification(
                    sub.info,
                    JSON.stringify({
                      title: "Congratulations!",
                      body: "Your team completed the mission!"
                    })
                  )
                )
              })
              clues.forEach(clue => clue.destroy())
              team.update({ activeMission: false })
            }
          })
          .catch(console.error)
      })
    )
    .catch(console.error)
}
