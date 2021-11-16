import { reactive } from "vue";
import axios from "axios";
import { iTrajeto } from '@/models/interfaces'
//@ts-ignore
import util from '@/plugins/util.js';

var geoWatch: any;

export const state = reactive({
    latitude: 0,
    longitude: 0,
    loadGEO: true,
    ultimoTrajeto: '',
    btnGeo: false,
    trajeto: <iTrajeto>{},
    grid: ''
});

export const actions = {

    async getGeo() {
        // state.btnGeo = true;

        // state.loadGEO = true

        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((r) => {
        //         state.latitude = r.coords.latitude;
        //         state.longitude = r.coords.longitude;
        //         // console.log(r);
        //         state.btnGeo = false;
        //     })
        // } else {
        //     util.show('Ative o GPS para continuar')
        // }


        // state.loadGEO = false


        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(actions.setCurrentPosition, actions.positionError, {
                enableHighAccuracy: false,
                timeout: 15000,
                maximumAge: 0
            });
        }


    },

    setCurrentPosition(position: any) {
        state.latitude = position.coords.latitude;
        state.longitude = position.coords.longitude;
    },


    positionError(error: any) {

        switch (error.code) {
            case error.PERMISSION_DENIED:

                util.show("User denied the request for Geolocation.");
                break;

            case error.POSITION_UNAVAILABLE:

                util.show("Location information is unavailable.");
                break;

            case error.TIMEOUT:

                util.show("The request to get user location timed out.");
                break;

            case error.UNKNOWN_ERROR:

                util.show("An unknown error occurred.");
                break;
        }
    },

    startWatch() {

        if (!geoWatch) {

            if ("geolocation" in navigator && "watchPosition" in navigator.geolocation) {

                geoWatch = navigator.geolocation.watchPosition(actions.setCurrentPosition, actions.positionError, {
                    enableHighAccuracy: false, timeout: 15000, maximumAge: 0
                });

            }
        }
    },

    stopWatch() {
        navigator.geolocation.clearWatch(geoWatch);
        geoWatch = undefined;
    },

    async getTrajetoAberto() {


        let { data } = await axios.post('/trajeto', {
            call: 'getTrajetoAberto'
        })

        data = data.length ? data[0] : []

        state.trajeto = data;
    },


    async iniciaTrajeto(km: number | any) {

        if (state.latitude == 0 || state.latitude == null) {
            util.show('Parece que o GPS não está funcionado')
            return;
        }

        let { data } = await axios.post('/trajeto', {
            call: 'iniciaTrajeto',
            param: {
                latitude: state.latitude,
                longitude: state.longitude,
                km: km
            }
        })


        return data


    },

    async finalizarTrajeto(km: number | any, id_router: number | any) {

        if (state.latitude == 0 || state.latitude == null) {
            util.show('Parece que o GPS não está funcionado')
            return;
        }

        let { data } = await axios.post('/trajeto', {
            call: 'finalizarTrajeto',
            param: {
                latitude: state.latitude,
                longitude: state.longitude,
                id_router: id_router,
                km: km
            }
        })

        return data

    },

    async getUltimoTrajeto() {

        let { data } = await axios.post('/trajeto', {
            call: 'getUltimoTrajeto'
        })

        data = data.length ? data[0].f_km : []

        state.ultimoTrajeto = data

    }



}

export default {
    state,
    actions,
};
