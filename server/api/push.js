const router = require("express").Router()
module.exports = router
const webpush = require("web-push")
const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY
console.log(publicVapidKey, privateVapidKey)

let subscription = {}

webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY)
webpush.setVapidDetails(
  "mailto:jasminejacquelin@gmail.com",
  publicVapidKey,
  privateVapidKey
)

// const settings = {
//   id: process.env.GOOGLE_API_KEY
// }
// const PushNotifications = new require("node-pushnotifications")
// const push = new PushNotifications(settings)
// const registrationIds = []

const testData = {
  title: "Hello World",
  body: "this is the body"
}

router.post("/register", (req, res, next) => {
  subscription = req.body
  console.log(subscription)
  res.send("GOT IT")
  setInterval(() => {
    webpush.sendNotification(subscription, "ITS WORKING")
  }, 1000)
})
