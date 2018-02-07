// Sera déclenché quand le service worker sera installé
self.addEventListener('install', (event) => {
  console.log('Le service worker est installé');

  const staticAssets = [
    '/',
    '/static/manifest.json',
    '/static/js/app.js',
    '/static/js/vendor.js',
    '/static/js/manifest.js',
    '/static/css/app.css',
    '/static/fonts/fontawesome-webfont.eot',
    '/static/fonts/fontawesome-webfont.ttf',
    '/static/fonts/fontawesome-webfont.woff',
    '/static/fonts/fontawesome-webfont.woff2',
    '/static/img/fontawesome-webfont.svg',
  ];

  event.waitUntil(
    // Ouverture du cache ayant le namespace "assets"
    caches.open('assets').then(
      // Appel réseau de tous nos assets et mise en cache du résultat
      cache => cache.addAll(staticAssets)
    )
  );
});

// Sera déclenché à chaque appel réseau de l'application
self.addEventListener('fetch', (event) => {
  const messagesApiUrl = 'https://microblog-api.herokuapp.com/api/messages';
  if (event.request.url.indexOf(messagesApiUrl) > -1 && event.request.method === 'GET') {
    event.respondWith(
      caches.open('messages').then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    // On regarde si on a, dans le cache, une entrée qui correspond à notre requête
    event.respondWith(
      caches.match(event.request).then((responseCache) => {
        // Si on a une entrée, on renvoit l'entrée de cache, sinon on effectue l'appel réseau
        return responseCache || fetch(event.request);
      })
    );
  }
});


/*
  Push notifications
 */

// Sera déclenché quand le SW recevra un évènement push depuis l'extérieur
self.addEventListener('push', (event) => {
  console.log(`Evènement push reçu avec le texte : "${event.data.text()}"`);

  // Configuration de la notification
  const title = 'Progressive Web App';
  const options = {
    body: event.data.text(),
    icon: '/static/img/app_icon/app_icon_96.png',
    badge: '/static/img/app_icon/app_icon_96.png',
  };

  // Envoi de la notification à l'utilisateur
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

