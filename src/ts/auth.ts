import axios from "axios";
import storeLogin from "../pages/login/login";

export default () => {
  let isAuth: any = false;

  if (storeLogin.state.mobile) {

    if (localStorage.getItem(storeLogin.state.nameStorage))
      //@ts-ignore
      isAuth = JSON.parse(localStorage.getItem(storeLogin.state.nameStorage));
  } else {

    if (sessionStorage.getItem(storeLogin.state.nameStorage))
      //@ts-ignore
      isAuth = JSON.parse(sessionStorage.getItem(storeLogin.state.nameStorage));
  }

  if (isAuth) {
    axios.defaults.headers.common["Authorization"] = isAuth.token;
    storeLogin.actions.setAuth(true);
  }
};
