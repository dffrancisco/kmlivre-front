
<script setup lang="ts">
import { nextTick, ref, onMounted } from "vue";
import ReloadPWA from "./components/ReloadPWA.vue";
import loginStore from '@/pages/login/login'
import homeState from '@/pages/home/home'
import { actions } from '@/globalStore'

let install = ref(false);
let deferredPrompt: null

nextTick(() => {


  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.onfocus = () => {

      homeState.actions.getGeo()

      if (loginStore.state.auth)
        if (loginStore.state.mobile)
          homeState.actions.getTrajetoAberto()
    }
  }

  window.addEventListener("appinstalled", () => {
    console.log("a2hs installed, --");
  });


  //@ts-ignore
  if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
    install.value = false;
    console.log("display-mode is standalone");
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    //@ts-ignore
    deferredPrompt = e;
    install.value = true;
    console.log("beforeinstallprompt");


    setTimeout(() => {
      install.value = false;
    }, 10000);
  });

})

// install.value = true;

const installApp = () => {
  install.value = false;
  //@ts-ignore
  deferredPrompt.prompt();

  //@ts-ignore
  deferredPrompt.userChoice.then((choiceResult: any) => {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the A2HS prompt");
    } else {
      console.log("User dismissed the A2HS prompt");
    }

    deferredPrompt = null;
  });
}

onMounted(async () => {


  // // Listen for our custom event from the SW registration
  // document.addEventListener('swUpdated', () => {
  //   console.log(`update, swUpdated`);
  // }, { once: true })

  // // Prevent multiple refreshes
  // navigator.serviceWorker.addEventListener('controllerchange', () => {
  //   console.log('update servercier ower controllerchange');
  //   // Here the actual reload of the page occurs
  //   window.location.reload()
  // })


  //@ts-ignore
  // if (import.meta.env.VITE_SERVER != 'http://localhost')
  //   await actions.subscription()

})

</script>


<template>
  <ReloadPWA />

  <!-- <van-nav-bar
    v-show="loginStore.state.auth"
    class="mb-2 elevation-2"
    :title="state.title"
    left-arrow
    @click-left="$router.back()"
  />-->

  <!-- <router-link to="home">Home</router-link> -->
  <!-- 
  <div v-show="install" class="backgroundBar divInstall">
    <span>Instalar KmLivre</span>
    <button dark color="blue" class="ml-10">Instalar</button>
  </div>-->

  <van-popup
    class="elevation-4"
    v-model:show="install"
    closeable
    close-icon-position="top-right"
    :overlay="false"
    round
    position="bottom"
    :style="{ height: '140px', maxWidth: '500px' }"
  >
    <div class="ml-5 mr-5 mt-5">
      <h4 class="pt-4">Gostaria de instalar o Km Livre em seu celular</h4>
    </div>
    <div class="ma-4">
      <van-button @click="installApp()" type="primary" size="large">Instalar</van-button>
    </div>
  </van-popup>

  <router-view></router-view>
</template>


<style lang='scss'>
@import "./assets/index.scss";
@import "./plugins/xModal/xModal.css";
@import "./plugins/xGridV2/xGridV2.css";

.divInstall {
  background-color: rgb(145 0 0);
  top: -1px;
  color: #ffffff;
  /* height: 14px; */
  left: 50%;
  padding: 8px;
  position: fixed;
  text-align: center;
  transform: translate(-50%);
  /* width: 100%; */
  z-index: 1000;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.van-popup {
  margin-left: 50%;
  transform: translate(-50%, 0);
}
</style>
