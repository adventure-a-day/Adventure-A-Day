const { URLSearchParams } = require('url');

const User = require('./user')
const Team = require('./team')
const Mission = require('./mission')
const Subscription = require('./subscription')
const Clue = require('./clue')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Team, { through: 'teamMembers' })
Team.belongsToMany(User, { through: 'teamMembers' })

Team.belongsTo(Mission)
Mission.hasMany(Team)

Clue.belongsTo(Mission)
Mission.hasMany(Clue)

Subscription.belongsTo(User)
User.hasMany(Subscription)


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
  Clue
}
