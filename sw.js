// هر بار که فایل‌های سایت را عوض کردی، شماره نسخه را بالا ببر (v3, v4, ...)
const CACHE_NAME = 'artemin-land-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './common.js',
  './admin.html',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// اول از اینترنت می‌گیرد (همیشه آخرین نسخه)، اگر آفلاین بود از کش
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // درخواست‌های بیرونی (Firebase، QR، نقشه) را به مرورگر بسپار
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
