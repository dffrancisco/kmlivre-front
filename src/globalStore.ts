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
    endpoint: 'https://fcm.googleapis.com/fcm/send/crCwkyJe3RQ:APA91bGpevg8kW9fvNO5EYDzbdYEpWMgjDvjARdedYj8hAmUm2WHf_kQughB1DAzoQC3f6rFkIapbdnQ2_NVPQ2F16MXuEMgL5dsOrq7Xch3Z_3YzOe3Yc5CIbLrvAbL95Z1HkgjccYJ',
    p256dh: 'BPwNYMDXhDxHAmmdYmuEBfp8z-zf-ZmWuN8JzwhAYF1VngmMHEw5DIU__RnV3kTHXrjSCOGFC5v0ldFWEAiDBV4',
    auth: 'MqteZ_6ItBNt-oaSf3nTAA'

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
