<template>
  <div v-if="!offlineReady || needRefresh">
    <div class="message mt-1">
      <van-popup v-model="offlineReady">App ready to work offline</van-popup>
      <span v-if="offlineReady">App ready to work offline</span>
      <span v-else>New content available, click on reload button to update.</span>
    </div>

    <button v-if="needRefresh" @click="updateServiceWorker()">Reload</button>

    <van-popup class="p-reload rounded" v-model:show="needRefresh">
      <h3>Nova atualização disponível, click para atualizar.</h3>
      <van-button round @click="updateServiceWorker()" class="mt-5 px-15" type="primary">Atualizar</van-button>
    </van-popup>

    <!-- <button @click="close">Close </button>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//@ts-ignore
import { useRegisterSW } from "virtual:pwa-register/vue";
const { updateServiceWorker } = useRegisterSW();

export default defineComponent({
  name: "ReloadPWA",
  setup() {

    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

    console.log(offlineReady.value, needRefresh.value);

    const close = async () => {
      offlineReady.value = false;
      needRefresh.value = false;
    };

    // needRefresh.value = true;

    return { offlineReady, needRefresh, updateServiceWorker, close };
  },
  methods: {

    async close() {
      this.offlineReady.value = false;
      this.needRefresh.value = false;
    },

    async updateServiceWorker() {
      await updateServiceWorker();
    },
  },
});
</script>

<style lang="scss">
.p-reload {
  text-align: center;
  padding: 15px;
}
</style>
