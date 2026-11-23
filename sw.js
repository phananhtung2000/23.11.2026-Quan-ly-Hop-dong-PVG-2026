/* Service worker - Quan ly hop dong PVG 2026 (PWA)
   Chi cache tai nguyen tinh (app shell). Khong can thiep vao du lieu nghiep vu:
   du lieu nam o IndexedDB (pvg_hd_2026) va tuy chon giao dien o localStorage,
   khong di qua network. */
const CACHE_NAME = 'quan-ly-hop-dong-pvg-cache-v1';
const CACHE_PREFIX = 'quan-ly-hop-dong-pvg-cache-';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names
          .filter(n => n.startsWith(CACHE_PREFIX) && n !== CACHE_NAME)
          .map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return; // khong can thiep request ngoai origin
  const isStatic = req.mode === 'navigate' || /\.(html|json|png|jpg|jpeg|svg|css|js|ico)$/.test(url.pathname);
  if (!isStatic) return;
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(req).then(hit => {
        if (hit) return hit;
        return fetch(req).then(res => {
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        }).catch(() => {
          if (req.mode === 'navigate') return cache.match('./index.html');
        });
      })
    )
  );
});
