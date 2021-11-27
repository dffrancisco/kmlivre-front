<script lang="ts" setup>
import { actions, state } from "./cadUser"

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
                            <mdicon
                                @click="actions.desativarUser(item)"
                                name="delete"
                                class="btnIcon"
                            />
                            <button>Desativar</button>
                            <button @click="actions.alterarUser(item)">alterar</button>
                            <button @click="actions.alterarPass(item)">senha</button>
                        </van-col>
                    </van-row>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.btnIcon {
    cursor: pointer;
}
.btnIcon:hover {
    color: #88a1c7;
}

.c-main {
    margin: auto;
    max-width: 800px;
}
// .date_in {
//     margin-left: 25px;
//     margin-top: 50px;
// }
.topName {
    background-color: #88a1c7;
    color: black;
}
</style>