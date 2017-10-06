// Sera déclenché quand le service worker sera installé
self.addEventListener('install', (event) => {
  console.log('Le service worker est installé');
});

// Sera déclenché à chaque appel réseau de l'application
self.addEventListener('fetch', (event) => {
  console.log('appel : ', event.request.url);
});
