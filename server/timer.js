const INTERVAL_TIME = 86400000 //this is 24 hours
const HOUR = 12
const MINUTE = 15

const { Subscription } = require("./db/models")
const webpush = require("./webpush")

const testData = {
  title: "Testing",
  body: "It's a success!",
  icon: "/images/earth-48x48.png"
}

module.exports = () => {
  const now = new Date(Date.now())
  let timeTillNoon =
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), HOUR, MINUTE) -
    new Date(Date.now())
  if (timeTillNoon < 1) {
    timeTillNoon =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        HOUR,
        MINUTE
      ) - new Date(Date.now())
  }
  setTimeout(() => {
    setInterval(() => {
      Subscription.findAll()
        .then(subscription => {
          webpush.sendNotification(subscription.info, JSON.stringify(testData))
        })
        .catch(console.error)
    }, INTERVAL_TIME)
  }, timeTillNoon)
}
