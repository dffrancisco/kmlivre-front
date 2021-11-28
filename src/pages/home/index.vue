<script setup lang="ts">
import { ref, onMounted } from 'vue'
import loginStore from '@/pages/login/login'
import { state, actions } from './home'
import globalStore from '@/globalStore';

import CTrajeto from './components/cTrajeto.vue';
import CRotas from './components/cRotas.vue';

const tabActive = ref('Trajeto');
const show = ref(false);

onMounted(async () => {

	if (loginStore.state.auth) {
		actions.getTrajetoAberto();
		actions.getUltimoTrajeto()
	}

	await actions.getGeo()
})

// function getRotas() {
// 	console.log(tabActive.value);
// 	if (tabActive.value == 'Rotas')
// 		actions.getRotas()
// }


</script>

<template>
	<van-nav-bar fixed :title="tabActive">
		<template #right>
			<mdicon size="30" @click="show = true" name="logout" />
			<!-- <van-icon name="more-o" /> -->
		</template>
	</van-nav-bar>
	<van-popup v-model:show="show" position="top" round closeable :style="{ height: '30%' }">
		<van-button class="ma-10" size="small" @click="loginStore.actions.logOut()" type="warning">Sair</van-button>
		<div class="text-center">
			<input v-model="globalStore.state.endpoint" type="text" />
			<br />
			<input v-model="globalStore.state.p256dh" type="text" />
			<br />
			<input v-model="globalStore.state.auth" type="text" />
			<br />
			<van-button @click="globalStore.actions.receberMsg()">Receber mensagem</van-button>
		</div>
	</van-popup>

	<van-tabbar v-model="tabActive">
		<van-tabbar-item name="Trajeto" icon="home-o">Trajeto</van-tabbar-item>
		<van-tabbar-item @click="actions.getRotas()" name="Rotas" icon="search">Rotas</van-tabbar-item>
	</van-tabbar>

	<div style="margin-top: 50px;">
		<div v-show="tabActive == 'Trajeto'">
			<CTrajeto :trajeto="state.trajeto" />
		</div>
		<div v-show="tabActive == 'Rotas'">
			<CRotas :rotas="state.rotas" />
		</div>
	</div>

	<!-- <van-button @click="actions.getGeo()">Geo</van-button> -->
	<!-- <van-button class="ma-10" size="small" @click="loginStore.actions.logOut()" type="warning">Sair</van-button> -->
</template>

<style scoped>
.van-nav-bar {
	background: #c3cfe2;
}
</style>

<route>
  {
	  meta:{
		  xico:'alves'
	  }
  }
</route>
