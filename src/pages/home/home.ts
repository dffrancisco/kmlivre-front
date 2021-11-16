import { reactive } from "vue";
import axios from "axios";
import { iTrajeto } from '@/models/interfaces'
//@ts-ignore
import util from '@/plugins/util.js';

export const state = reactive({
    latitude: 0,
    longitude: 0,
    trajeto: <iTrajeto>{},
    grid: ''
});

export const actions = {

    async getGeo() {

        return new Promise((Response) => {

            navigator.geolocation.getCurrentPosition((r) => {
                state.latitude = r.coords.latitude;
                state.longitude = r.coords.longitude;
            });

            console.log('geo');
            Response(true)

        })


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

    async finalizarTrajeto(km: number | any) {

        if (state.latitude == 0 || state.latitude == null) {
            util.show('Parece que o GPS não está funcionado')
            return;
        }

        let { data } = await axios.post('/trajeto', {
            call: 'finalizarTrajeto',
            param: {
                latitude: state.latitude,
                longitude: state.longitude,
                km: km
            }
        })

        return data

    }

}

export default {
    state,
    actions,
};
