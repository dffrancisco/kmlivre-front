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
    icon: './icon/icon-km-128.png'
  });

  console.log(data)
  console.log('Notification Received');

  // e.waitUntil(
  //   //@ts-ignore
  //   self.regenerate.showNotification(data.title, {
  //     body: data.message,
  //     icon: './icon/icon-km-128.png',
  //     vibrate: [100, 50, 100],
  //     actions: [
  //       { action: 'abrir', title: 'Abir', icon: 'https://cdn.iconscout.com/icon/free/png-256/art-museum-painting-palette-38814.png' },
  //       { action: 'close', title: 'Fechar', icon: './icon/icon-km-128.png' }
  //     ]

  //   }
  //   )
  // )

});


// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)