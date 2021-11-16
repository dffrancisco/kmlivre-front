import { reactive } from "vue";
import version from '../package.json'
export const state = reactive({
    title: '',
    version: version.version,
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
