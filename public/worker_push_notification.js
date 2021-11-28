console.log('Service Worker Works');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data)
    console.log('Notification Received');

    self.registration.showNotification(data.title, {
        body: data.message,
        vibrate: [100, 50, 100],
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1024px-Archlinux-icon-crystal-64.svg.png'
    });

    // e.waitUntil(
    //     self.regenerate.showNotification(data.title, {
    //         body: data.message,
    //         icon: './icon/icon-km-128.png',
    //         vibrate: [100, 50, 100],
    //         actions: [
    //             { action: 'abrir', title: 'Abir', icon: 'https://cdn.iconscout.com/icon/free/png-256/art-museum-painting-palette-38814.png' },
    //             { action: 'close', title: 'Fechar', icon: './icon/icon-km-128.png' }
    //         ]

    //     }
    //     )
    // )

});