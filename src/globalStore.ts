import { reactive } from "vue";
import version from '../package.json'
import axios from "axios";

const PUBLIC_VAPID_KEY = "BLZ6YykpVIP-zawW74FftJaQi8QDPCDSGhsWlke2OEHRZAh7jN8d-HkDH_OmQzwn42zVhM0vkdvda1Dh-Dmmjf4";

export const state = reactive({
    title: '',
    version: version.version,
    login: {
        name: '',
        token: '',
        in: false,
    },
    endpoint: 'https://fcm.googleapis.com/fcm/send/fmfVw29WEW4:APA91bFqpU0wFk7I69kvgEzmpSBkGV_nDB1wD7CzpGQ70KIV0CAv9pyQf3jZ-U2aYgULmsAV866LAJaTyEglMXGqRnJiAJ0o-8AzWC5Q3mf7nThvgAvjdKr6cNio18ilUae5U870EOLQ',
    p256dh: 'BNenKLUFLy2Hea0LYNh_6NFxjWa3grYm2GMjZLXY-3xJ-P5shUo3C85QnShtD_BJXl2C-Au7_3EBY-PjhxrocTs',
    auth: 'ndgmQgzCl6lbLuKe3uBzPg'

})

export const actions = {

    urlBase64ToUint8Array(base64String: string) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    },

    async subscription() {
        // Service Worker
        console.log("Registering a Service worker");

        // const register = await navigator.serviceWorker.register("/worker_push_notification.js", {

        const register = await navigator.serviceWorker.register('/sw.js', {
            scope: "/"
        });


        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: actions.urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
        });


        axios.post('/register', {
            call: 'worker',
            worker: JSON.stringify(subscription)

        })



    },

    receberMsg() {
        axios.post('/register', {
            call: 'receber',
            endpoint: state.endpoint,
            p256dh: state.p256dh,
            auth: state.auth
        })
    }



}

export const getters = {

}

export default {
    state,
    actions,
    getters
};
