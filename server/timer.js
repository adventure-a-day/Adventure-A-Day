// Change the interval and time to go off here
// 24 hours = 86400000 milliseconds
const INTERVAL_TIME = 86400000
const HOUR = 12
const MINUTE = 0

const { Subscription } = require("./db/models")
const webpush = require("./webpush")

const testData = {
  title: "Testing",
  body: "It's a success!",
  icon: "/images/earth-48x48.png"
}

// Function to send Subscribers their messages
const messageSubscribers = () => {
  Subscription.findAll()
    .then(subscriptions => {
      subscriptions.forEach(subscription => {
        console.log(subscription.info)
        webpush
          .sendNotification(subscription.info, JSON.stringify(testData))
          .catch(console.error)
      })
    })
    .catch(console.error)
}

// Function to Set a Timer for a specific time
// and to execute the message Subscribers function
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
    messageSubscribers()
    setInterval(messageSubscribers, INTERVAL_TIME)
  }, timeTillNoon)
}
