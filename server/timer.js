// Change the interval and time to go off here
// 24 hours = 86400000 milliseconds
const INTERVAL_TIME = 30000
const HOUR = 12
const MINUTE = 0

const messageSubscribers = require("./messageSubscribers")

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
  }, 0)
}
