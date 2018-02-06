var cacheName = "where-in-the-world"
const networkFirst = "where-in-the-world-network-first"

var filesToCache = [
  "/",
  "/style.css",
  "/favicon.ico",
  "/bundle.js.map",
  "/bundle.js",
  "/images/earth-48x48.png"
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
    caches.open(cacheName).then(cache =>
      cache.match(event.request).then(response => {
        return (
          response ||
          cache.open(networkFirst).then(cache =>
            cache.match(event.request).then(response => {
              fetch(event.request).then(fetchResponse => {
                cache.put(event.request, fetchResponse.clone())
                return fetchResponse || response
              })
            })
          )
        )
      })
    )
  )
})

self.addEventListener("push", event => {
  const data = event.data.json()
  const { title } = data

  const body = {
    body: data.body,
    icon: "/images/earth-48x48.png"
  }

  event.waitUntil(self.registration.showNotification(title, body))
})
