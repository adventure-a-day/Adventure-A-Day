const router = require("express").Router()
const { User } = require("../db/models")
module.exports = router

// This is exposing all of the users email addresses, was this supposed
// to be to find a user by email?

// router.get("/", (req, res, next) => {
//   User.findAll({
//     // explicitly select only the id and email fields - even though
//     // users' passwords are encrypted, it won't help if we just
//     // send everything to anyone who asks!
//     attributes: ["id", "email"]
//   })
//     .then(users => res.json(users))
//     .catch(next)
// })

router.get("/all-users", (req, res, next) => {
  User.findAll({
    attributes: ["displayName", "photo"]
  })
    .then(users => res.json(users))
    .catch(next)
})
