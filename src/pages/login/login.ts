import axios from "axios";
import md5 from "md5";
import { reactive } from "vue";
import router from "../../router";
import { validMail } from "../../ts/utils";
import { iLogin } from '@/models/interfaces'
//@ts-ignore
import util from "../../plugins/util.js";

export const state = reactive({
  nameStorage: 'isAuthKMLivre',
  login: <iLogin>{},
  auth: false,
  email: import.meta.env.VITE_USER || "",
  pass: import.meta.env.VITE_PASS || "",
  btnLoad: false,
  mobile: false,
});

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  state.mobile = true;


export const actions = {
  setLogin(login: iLogin) {
    state.login = login;
  },

  setAuth(auth: boolean) {
    state.auth = auth;
  },


  async getLogin() {
    let pass = state.pass;

    if (pass == "") {
      util.show("Informe a senha para continuar");
      return false;
    }

    //@ts-ignore
    if (!validMail(state.email)) {
      util.show("E-mail inválido verifique");
      return false;
    }

    if (state.email == "") {
      util.show("Informe o e-mail para continuar");
      return false;
    }

    if (state.pass != "") pass = md5(state.pass);


    state.btnLoad = true;

    let rs = await axios.post("login", {
      call: "getLogin",
      param: {
        pass: pass,
        email: state.email
      }
    });

    state.btnLoad = false;

    if (rs.data.error) {
      util.show(rs.data.error);
    }

    if (rs.data.token) {
      state.email = "";
      state.pass = "";

      if (state.mobile)
        localStorage.setItem(state.nameStorage, JSON.stringify(rs.data));
      else
        sessionStorage.setItem(state.nameStorage, JSON.stringify(rs.data));

      axios.defaults.headers.common["Authorization"] = rs.data.token;

      this.setLogin(rs.data);
      this.setAuth(true);

      router.push("/");
    }
  },

  logOut() {
    sessionStorage.removeItem(state.nameStorage);
    localStorage.removeItem(state.nameStorage);

    this.setLogin({
      email: "",
      id_user: "",
      name: "",
      phone: "",
      token: "",
    });

    //@ts-ignore
    axios.defaults.headers.common["Authorization"] = null;

    this.setAuth(false);

    router.push("/login");
  },
};

export default {
  state,
  actions,
};
