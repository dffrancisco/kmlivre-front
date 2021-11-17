<template>
  <div v-if="offlineReady || needRefresh">
    <div class="message mt-1">
      <van-popup v-model="offlineReady">App ready to work offline</van-popup>
      <span v-if="offlineReady">App ready to work offline</span>
      <span v-else>New content available, click on reload button to update.</span>
    </div>

    <div>
      <button v-if="needRefresh" @click="updateServiceWorker()">Reload</button>
      <!-- <button @click="close">Close </button>-->
    </div>
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
    const close = async () => {
      offlineReady.value = false;
      needRefresh.value = false;
    };
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
