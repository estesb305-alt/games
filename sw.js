/* Rack-O service worker: makes the game work offline.
   When you change any file, bump VERSION so phones pick up the update. */
const VERSION = 'rack-o-v1';
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-48.png'
];
const FONT_CACHE = 'rack-o-fonts';

// Save the game files on install.
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

// Remove caches from older versions.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== FONT_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts: use the saved copy, refresh it in the background.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(async (cache) => {
        const cached = await cache.match(req);
        const fresh = fetch(req).then((res) => { cache.put(req, res.clone()); return res; }).catch(() => cached);
        return cached || fresh;
      })
    );
    return;
  }

  // The game itself: try the network first so updates arrive, fall back to the saved copy offline.
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
  }
});
