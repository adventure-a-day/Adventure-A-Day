const router = require("express").Router()
const { Subscription } = require("../db/models")
module.exports = router

const testData = {
  title: "Testing",
  body: "OMG IT WAS A SUCCESS",
  icon: "/images/earth-48x48.png"
}

const noUser = next => {
  let err = new Error("Must be logged in to Subscribe")
  err.status = 401
  next(err)
}
const noSubscription = next => {
  let err = new Error("No Subscription Found")
  err.status = 400
  next(err)
}

router
  .post("/register", (req, res, next) => {
    if (req.user) {
      Subscription.create({ info: req.body, userId: req.user.id })
        .then(() => res.sendStatus(201))
        .catch(next)
    } else {
      noUser(next)
    }
  })
  .delete("/unregister", (req, res, next) => {
    const userId = req.user.id
    if (req.user) {
      Subscription.findAll({ where: { userId } })
        .then(subscriptions => {
          const found = subscriptions.find(
            subscription => subscription.info.endpoint === req.body.endpoint
          )
          if (found) found.destroy()
          else noSubscription(next)
        })
        .then(() => res.sendStatus(200))
        .catch(next)
    } else {
      noUser(next)
    }
  })
