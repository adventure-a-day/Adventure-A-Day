import axios from "axios"
const vapidPublicKey =
  "BGn1dD0rQNTCewJp4RePvgStspr0pIzjEZShLoVp43eQaFJiSYM8XjxZxtofqIGrxacLeglOcLq9LwUC7cNW17o"
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

// Ask User if he/she wants to subscribe to push notifications and then
// ..subscribe and send push notification
export function subscribePush() {
  return navigator.serviceWorker.ready.then(registration =>
    registration.pushManager
      .subscribe({
        userVisibleOnly: true, //Always show notification when received
        applicationServerKey: convertedVapidKey
      })
      .then(subscription =>
        axios
          .post("/api/push/register", subscription)
          .then(() => console.log("Push Subscribed\n", subscription))
          .catch(err => {
            subscription.unsubscribe()
            throw err
          })
      )
  )
}

// Unsubscribe the user from push notifications
export function unsubscribePush() {
  return navigator.serviceWorker.ready.then(registration =>
    //Get `push subscription`
    registration.pushManager.getSubscription().then(subscription =>
      //Unsubscribe `push notification`
      subscription
        .unsubscribe()
        .then(() =>
          axios
            .delete("/api/unregister", subscription)
            .then(() =>
              console.info("Push notification unsubscribed.\n", subscription)
            )
        )
    )
  )
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
