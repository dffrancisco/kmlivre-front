<script setup lang="ts">
//@ts-ignore
import { actions, state } from "./cadUser"
import { onMounted, nextTick, ref } from "vue"

onMounted(() => {
    actions.getUsuarios()
})
nextTick(() => {

    actions.modais()

})


</script>

<template>
    <div class="ml-3 mr-3 mt-3">
        <div class="c-main">
            <van-button type="default" @click="actions.novoUser()" class="mb-1">Novo</van-button>
        </div>
        <div class="c-main elevation-4">
            <van-row class="pl-3 topName">
                <van-col span="8">Nome</van-col>
                <van-col span="10">Email</van-col>
                <van-col span="6">Configuração</van-col>
            </van-row>
            <van-list>
                <van-cell v-for="item in state.usuarios">
                    <van-row>
                        <van-col span="8">{{ item.name }}</van-col>
                        <van-col span="10">{{ item.email }}</van-col>
                        <van-col span="6">
                            <button @click="actions.desativarUser(item)">Desativar</button>
                            <button @click="actions.alterarUser(item)">alterar</button>
                            <button @click="actions.alterarPass(item)">senha</button>
                        </van-col>
                    </van-row>
                </van-cell>
            </van-list>
        </div>
    </div>

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
.c-main {
    margin: auto;
    max-width: 800px;
}
.date_in {
    margin-left: 25px;
    margin-top: 50px;
}
.topName {
    background-color: #88a1c7;
    color: black;
}

.font-1 {
    font-size: 17px;
}
.principal {
    // height: 100vh;
    display: flex;
    justify-content: center;
}
.card {
    background-color: #b010e6;
    height: 150px;
    width: 280px;
    margin-right: 25px;
    margin-top: 15px;
    border-top: #cc1efc solid 20px;
    box-shadow: 4px 2px 2px #444444bf;
    color: black;
}
</style>