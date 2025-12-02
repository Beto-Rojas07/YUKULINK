// -------------------- SERVICE WORKER YUKULINK --------------------

// Nombre y versión del caché
const CACHE_NAME = 'v4_cache_YUKULINK';

// Archivos a cachear
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/main.js',
  './img/icon-192x192.png',
  './img/icon-512x512.png'
];

// INSTALACIÓN → Guardar en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch(err => console.log('❌ Error al cachear', err))
  );
});

// ACTIVACIÓN → Eliminar cachés viejos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (!cacheWhitelist.includes(name)) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// FETCH → Buscar en caché o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request))
  );
});


// -------------------- NOTIFICACIONES PUSH --------------------

// Recibir notificación push (si en el futuro usas servidor)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};

  const opciones = {
    body: data.body || 'Tienes un nuevo mensaje.',
    icon: './img/icon-192x192.png',
    badge: './img/icon-192x192.png',
    image: data.image || './img/yuku.jpeg',
    vibrate: [200, 100, 200],
    actions: [
      { action: 'responder', title: 'Responder' },
      { action: 'ver', title: 'Ver Chat' }
    ],
    tag: 'yukulink-msg',
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'YukuLink', opciones)
  );
});


// 🔔 Clic en notificación
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'responder') {
    event.waitUntil(
      clients.openWindow('https://wa.me/527571195641')
    );
    return;
  }

  if (event.action === 'ver') {
    event.waitUntil(
      clients.openWindow('https://web.whatsapp.com/')
    );
    return;
  }

  event.waitUntil(
    clients.openWindow('https://yukulink.com')
  );
});

