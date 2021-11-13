import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from "axios";
import Vant from 'vant';
import 'vant/lib/index.css';
import config from "./ts/config";

import { setupInterceptorsTo } from "./pages/login/interceptor";

const app = createApp(App)

setupInterceptorsTo(axios);

if (import.meta.env.VITE_SERVER)
    axios.defaults.baseURL = config.SERVER + ":" + config.PORT;
else
    axios.defaults.baseURL = config.SERVER;



app.use(router);
app.use(Vant);

app.mount('#app')
