const router = require("express").Router()
module.exports = router

router
  .use("/users", require("./users"))
  .use("/teams", require("./teams"))
  .use("/clues", require("./clues"))
  .use("/push", require("./push"))
  .use("/messages", require("./messages"))
  .use("/missions", require("./missions"))
  .use("/photos", require("./photos"))
  .use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
  })
