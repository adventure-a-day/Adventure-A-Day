var cacheName = "where-in-the-world"

var filesToCache = [
  "./",
  "./style.css",
  "./favicon.ico",
  "./bundle.js.map",
  "./bundle.js"
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
  console.log("Service Worker: Fetch", event.request.url)

  console.log("Url", event.request.url)

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
