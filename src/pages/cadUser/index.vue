<script setup lang="ts">
//@ts-ignore
import { actions, state } from "./cadUser"
import { onMounted, nextTick, ref } from "vue"
import CListUsers from "./cListUsers.vue"
import CNewUser from "./cNewUser.vue"

onMounted(() => {
    actions.getUsuarios()
})
nextTick(() => {

    actions.modais()

})


</script>

<template>
    <CListUsers />

    <CNewUser />

    <div id="xmEditUser">
        <van-cell-group inset>
            <van-field v-model="state.dadosUser.name" type="text" label="Nome" />
            <van-field v-model="state.dadosUser.email" type="email" label="Email" />
            <van-field v-model="state.dadosUser.phone" type="text" label="Telefone" />
        </van-cell-group>
        <van-switch v-model="state.checkedApp" class="ml-6" />
        <span class="ml-2">APP</span>

        <van-switch v-model="state.checkedAdm" class="ml-6" />
        <span class="ml-2">Admin</span>
    </div>

    <div id="xmEditPass">
        <span class="ma-4 font-1">{{ state.dadosUser.name }}</span>
        <van-field v-model="state.dadosUser.pass" type="password" label="Senha" />
        <van-field v-model="state.dadosUser.confirmPass" type="password" label="Confirmar senha" />
    </div>
</template>

<style lang="scss" scoped>
.font-1 {
    font-size: 17px;
}

// .principal {
//     // height: 100vh;
//     display: flex;
//     justify-content: center;
// }
// .card {
//     background-color: #b010e6;
//     height: 150px;
//     width: 280px;
//     margin-right: 25px;
//     margin-top: 15px;
//     border-top: #cc1efc solid 20px;
//     box-shadow: 4px 2px 2px #444444bf;
//     color: black;
// }
</style>