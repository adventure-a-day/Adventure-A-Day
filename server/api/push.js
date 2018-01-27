const settings = {
  id: process.env.GOOGLE_API_KEY
}
const PushNotifications = new require("node-pushnotifications")
const push = new PushNotifications(settings)
const router = require("express").Router()
const registrationIds = []

const testData = {
  title: "Hello World",
  body: "this is the body"
}

router.post("/register", (req, res, next) => {
  push
    .send(registrationIds, testData)
    .then(() => console.log("WOOOHOOO!!!"))
    .catch(console.error)
})
