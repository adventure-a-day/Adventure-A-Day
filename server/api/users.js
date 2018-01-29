const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/all-users', (req, res, next) => {
  User.findAll({
    attributes: ['displayName', 'photo']
  })
  .then(users => res.json(users))
  .catch(next)
})

router.get('/:userId', (req, res, next) => {
  const userId = req.params.userId
  User.findOne({
    where: {
      id: userId
    },
    include: [{all: true}]
  })
  .then(user => res.json(user))
  .catch(next)
})