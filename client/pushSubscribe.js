import axios from "axios"

// Ask User if he/she wants to subscribe to push notifications and then
// ..subscribe and send push notification
export default function subscribePush() {
  navigator.serviceWorker.ready.then(registration => {
    if (!registration.pushManager) {
      alert("Your browser doesn't support push notification.")
      return false
    }

    //To subscribe `push notification` from push manager
    registration.pushManager
      .subscribe({
        userVisibleOnly: true //Always show notification when received
      })
      .then(subscription => {
        console.info("Push notification subscribed.")
        console.log(subscription)
        saveSubscriptionID(subscription)
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
            deleteSubscriptionID(subscription)
          })
          .catch(error => console.error(error))
      })
      .catch(() => console.error("Failed to unsubscribe push notification."))
  })
}

function saveSubscriptionID(subscription) {
  var subscription_id = subscription.endpoint.split("gcm/send/")[1]

  axios.post("/api/push", {
    subscriptionId: subscription_id
  })
}

function deleteSubscriptionID(subscription) {
  var subscription_id = subscription.endpoint.split("gcm/send/")[1]
  axios.delete("/api/user/" + subscription_id)
}
