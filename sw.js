// Auto-versioned cache name — bump APP_VERSION on every deploy
// so old caches are automatically discarded.
const APP_VERSION = '2.0.1'; // <-- bump this number on every deploy
const CACHE_NAME = `btc-calc-${APP_VERSION}`;
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', event => {
  // Activate this new service worker immediately,
  // instead of waiting for old tabs to close.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  // Delete any old version caches so stale files can never be served.
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim()) // take control of open tabs right away
  );
});

self.addEventListener('fetch', event => {
  // Network-first for HTML (so updates show immediately),
  // cache-first fallback for everything else (faster offline loads).
  const isHTML = event.request.mode === 'navigate' ||
                 event.request.headers.get('accept')?.includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  }
});
