module.exports = (req, res, next) => {
  if (req.user.id === req.params.userId) {next()}
  else {
    let err = new Error("You are not allowed to access this users information")
    err.status = 401
    next(err)
  }
}
