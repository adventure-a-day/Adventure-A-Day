const User = require("./user")
const Team = require("./team")
const Mission = require("./mission")
const Subscription = require("./subscription")
const Clue = require("./clue")
const UserTeamClueStatus = require("./userTeamClueStatus")
const Message = require("./message")

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Team, { through: "teamMembers" })
Team.belongsToMany(User, { through: "teamMembers" })

Team.belongsToMany(Mission, { through: "teamMissions" })
Mission.belongsToMany(Team, { through: "teamMissions" })

Clue.belongsTo(Mission)
Mission.hasMany(Clue)

Subscription.belongsTo(User)
User.hasMany(Subscription)

UserTeamClueStatus.belongsTo(User)
UserTeamClueStatus.belongsTo(Team)
UserTeamClueStatus.belongsTo(Clue)
User.hasMany(UserTeamClueStatus)
Team.hasMany(UserTeamClueStatus)
Clue.hasMany(UserTeamClueStatus)

Message.belongsTo(Team)
Message.belongsTo(User)
Team.hasMany(Message)
User.hasMany(Message)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Team,
  Mission,
  Subscription,
  Clue,
  UserTeamClueStatus,
  Message
}
