<script lang="ts" setup >
import { actions, state } from "./cadUser"

</script>

<template>
    <div id="xmNovoUser">
        <van-cell-group inset>
            <van-field v-model="state.dadosUser.name" type="text" label="Nome" />
            <van-field v-model="state.dadosUser.email" type="email" label="Email" />
            <van-field v-model="state.dadosUser.phone" type="text" label="Telefone" />
            <van-field v-model="state.dadosUser.pass" type="password" label="Senha" />
            <van-field
                v-model="state.dadosUser.confirmPass"
                type="password"
                label="Confirmar senha"
            />
        </van-cell-group>
        <van-switch v-model="state.checkedApp" class="ml-6" />
        <span class="ml-2">APP</span>

        <van-switch v-model="state.checkedAdm" class="ml-6" />
        <span class="ml-2">Admin</span>
    </div>
</template>