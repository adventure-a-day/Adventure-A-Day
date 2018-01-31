import axios from "axios"
const vapidPublicKey =
  "BGn1dD0rQNTCewJp4RePvgStspr0pIzjEZShLoVp43eQaFJiSYM8XjxZxtofqIGrxacLeglOcLq9LwUC7cNW17o"
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

// Ask User if he/she wants to subscribe to push notifications and then
// ..subscribe and send push notification
export function subscribePush() {
  navigator.serviceWorker.ready.then(registration => {
    if (!registration.pushManager) {
      alert("Your browser doesn't support push notification.")
      return false
    }
    //To subscribe `push notification` from push manager
    registration.pushManager
      .subscribe({
        userVisibleOnly: true, //Always show notification when received
        applicationServerKey: convertedVapidKey
      })
      .then(subscription => {
        console.info("Push notification subscribed.")
        console.log(subscription)
        axios
          .post("/api/push/register", subscription)
          .catch(() => subscription.unsubscribe())
      })
      .catch(error => {
        console.error("Push notification subscription error: ", error)
      })
  })
}

// Unsubscribe the user from push notifications
export function unsubscribePush() {
  navigator.serviceWorker.ready.then(registration => {
    //Get `push subscription`
    registration.pushManager
      .getSubscription()
      .then(subscription => {
        //If no `push subscription`, then return
        if (!subscription) {
          alert("Unable to unregister push notification.")
          return
        }

        //Unsubscribe `push notification`
        subscription
          .unsubscribe()
          .then(() => {
            console.info("Push notification unsubscribed.")
            console.log(subscription)
            axios.delete("/api/unregister", subscription)
          })
          .catch(error => console.error(error))
      })
      .catch(() => console.error("Failed to unsubscribe push notification."))
  })
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
