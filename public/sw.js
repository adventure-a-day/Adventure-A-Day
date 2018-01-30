var cacheName = "where-in-the-world"

var filesToCache = [
  "./",
  "./style.css",
  "./favicon.ico",
  "./bundle.js.map",
  "./bundle.js",
  "./images/earth-48x48.png"
]

// Install The Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache)
    })
  )
})

// On Service Worker Activation
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(key => {
          if (key !== cacheName) {
            return caches.delete(key)
          }
        })
      )
    })
  )
  return self.clients.claim()
})

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener("push", event => {
  const data = event.data.json()
  const { title } = data

  const body = {
    body: data.body,
    icon: data.icon
  }

  event.waitUntil(self.registration.showNotification(title, body))
})

/** This will be for deployment
 *
 * self.addEventListener("notificationclick", event => {
 *   event.notification.close()
 *   const url = "enter deployed link"
 *   // Check if there's already a tab open with this URL.
 *   event.waitUntil(
 *     self.clients
 *       .matchAll({
 *         type: "window"
 *       })
 *     .then(windowClients => {
 *         for (var i = 0; i < windowClients.length; i++) {
 *           const client = windowClients[i]
 *           if (client.url === url && "focus" in client) {
 *             return client.focus()
 *           }
 *         }
 *         if (self.clients.openWindow) {
 *           return self.clients.openWindow(url)
 *         }
 *       })
 *   )
 * })
 */
