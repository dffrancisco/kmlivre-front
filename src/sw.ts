import { precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})




self.addEventListener('push', e => {
  //@ts-ignore
  const data = e.data.json();

  self.registration.showNotification(data.title, {
    body: data.message,
    vibrate: [100, 50, 100],
    icon: './icon/icon-km-128.png',
    badge: './icon/icon-km-128.png',
    image: './icon/icon-km-128.png',
  });

});

self.addEventListener('notificationclick', event => {
  const rootUrl = new URL('/', location).href;
  event.notification.close();
  // Enumerate windows, and call window.focus(), or open a new one.
  event.waitUntil(
    clients.matchAll().then(matchedClients => {
      for (let client of matchedClients) {
        if (client.url === rootUrl) {
          return client.focus();
        }
      }
      return clients.openWindow("/");
    })
  );
});


// self.addEventListener('notificationclick', function (event) {
//   const rootUrl = new URL('./', location).href;
//   event.notification.close();
//   event.waitUntil(
//     clients.matchAll().then(matchedClients => {
//       for (let client of matchedClients) {
//         if (client.url.indexOf(rootUrl) >= 0) {
//           return client.focus();
//         }
//       }
//       return clients.openWindow(rootUrl).then(function (client) { client.focus(); });
//     })
//   );
// });

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)