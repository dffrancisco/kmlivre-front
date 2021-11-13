import { reactive } from "vue";


export const state = reactive({
    latitude: 0,
    longitude: 0
});

export const actions = {

    async getGeo() {
        navigator.geolocation.getCurrentPosition((r) => {
            state.latitude = r.coords.latitude;
            state.longitude = r.coords.longitude;
        });

    }

}

export default {
    state,
    actions,
};
