<script setup lang="ts">
import { actions, state } from "./login";
import globalStore from "@/globalStore";
// console.log(state);
// legal

</script>

<template>
    <div class="pnVersion">{{ globalStore.state.version }}</div>
    <!-- {{ state }} -->
    <div class="pnLogin">
        <div class="mb-10" style="text-align: center;">
            <img src="../../../public/icon/icon-km-128.png" />
            <h2>Km Livre</h2>
        </div>

        <van-cell-group style="min-width: 330px;" inset>
            <van-field
                v-model="state.email"
                label="E-mail"
                type="email"
                placeholder="e-mail"
                clearable
                :rules="[{ required: true, message: 'E-mail é obrigatório' }]"
            />

            <van-field
                v-model="state.pass"
                type="password"
                name="Senha"
                label="Senha"
                placeholder="Senha"
                :rules="[{ required: true, message: 'Senha é obrigatória' }]"
            />
        </van-cell-group>

        <div class="ml-3 mr-3 mt-10">
            <van-button
                :disabled="state.btnLoad"
                :loading="state.btnLoad"
                class="px-15"
                @click="actions.getLogin()"
                round
                block
                type="primary"
            >Entrar</van-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.pnLogin {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>