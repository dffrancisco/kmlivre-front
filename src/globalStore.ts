import { reactive } from "vue";

export const state = reactive({
    title: '',
    login: {
        name: '',
        token: '',
        in: false,
    }

})

export const actions = {
}

export const getters = {

}

export default {
    state,
    actions,
    getters
};
