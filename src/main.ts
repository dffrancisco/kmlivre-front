import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from "axios";
import Vant from 'vant';
import 'vant/lib/index.css';
import config from "./ts/config";

//@ts-ignore
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

import { setupInterceptorsTo } from "./pages/login/interceptor";

const app = createApp(App)

setupInterceptorsTo(axios);

//@ts-ignore
if (import.meta.env.VITE_SERVER)
    axios.defaults.baseURL = config.SERVER + ":" + config.PORT;
else
    axios.defaults.baseURL = config.SERVER;


app.use(mdiVue, { icons: mdijs })

app.use(router);
app.use(Vant);

app.mount('#app')
