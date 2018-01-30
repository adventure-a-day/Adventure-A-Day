const webpush = require("web-push")
const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY


webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY)
webpush.setVapidDetails(
  "mailto:jasminejacquelin@gmail.com",
  publicVapidKey,
  privateVapidKey
)

module.exports = webpush
