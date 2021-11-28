import { precacheAndRoute } from 'workbox-precaching'
declare let self: ServiceWorkerGlobalScope

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data)
    console.log('Notification Received');
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1024px-Archlinux-icon-crystal-64.svg.png'
    });
});
// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)