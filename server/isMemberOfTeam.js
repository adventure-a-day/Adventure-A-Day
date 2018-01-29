const { Team, User } = require("./db/models")

module.exports = (req, res, next) => {
  const { teamId } = req.params
  Team.findById(teamId, { include: [User] }).then(team => {
    if (team.users.filter(user => user.id === req.user.id).length > 0) {
      next()
    } else {
      let err = new Error("You are not a member of this team")
      err.status = 401
      next(err)
    }
  })
}
