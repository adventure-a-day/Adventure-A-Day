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

const testData = {
  title: "Testing",
  body: "OMG IT WAS A SUCCESS",
  icon: "/images/earth-48x48.png"
}

router.post("/register", (req, res, next) => {
  subscription = req.body
  console.log(subscription)
  res.send("GOT IT")
  setInterval(() => {
    webpush.sendNotification(subscription, JSON.stringify(testData))
  }, 10000)
})
