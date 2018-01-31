const { User, Team, Clue, UserTeamClueStatus } = require("./db/models")
const webpush = require("./webpush")

// const testData = {
//   title: "Testing",
//   body: "It's a success!",
//   icon: "/images/earth-48x48.png"
// }

// Function to send Subscribers their messages
module.exports = () => {
  Team.findAll({ include: [{ model: User.scope("subscriptions") }] })
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
                let clueIndex = Math.floor(Math.random() * clues.length - 1)
                const clue = clues[clueIndex]
                clues = clues.filter((clu, index) => index !== clueIndex)
                clue
                  .update({ userId: user.id, status: "assigned" })
                  .then(() => {
                    user.subscriptions.forEach(sub =>
                      webpush.sendNotification(
                        sub.info,
                        JSON.stringify(clue.clue)
                      )
                    )
                  })
                  .catch(console.error)
              })
            }
          })
          .catch(console.error)
      })
    )
    .catch(console.error)
}
