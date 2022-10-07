<script lang="ts" setup>
import axios from "axios";
import { reactive, ref } from "vue";
import { iTrajeto } from '@/models/interfaces'
import moment from "moment";
import { dataBrasil } from '@/ts/utils'

const state = reactive({
    rotas: <iTrajeto[]>{}
})

function openLink(rota: iTrajeto) {
    //@ts-ignore
    window.open(`https://www.google.com/maps/dir/${rota.b_latitude},+${rota.b_longitude}/${rota.f_latitude},+${rota.f_longitude}`, '_blank').focus();
}


async function getRotas() {
    let { data } = await axios.post("rotas", {
        call: "getRotas",
        id_user: "3",
        mes: "1,2",
        ano: 2022
    });

    state.rotas = data
}

let loadRotas = ref(false)

const ano = ref(moment().year());
const mes = ref(moment().month() + 1);


let anoOptions = <any>[];


for (let i = ano.value - 10; i < ano.value + 10; i++) {
    anoOptions.push({ text: i, value: i })
}

const mesOptions = [
    { text: 'Janeiro', value: 1 },
    { text: 'Fevereiro', value: 2 },
    { text: 'Março', value: 3 },
    { text: 'Abril', value: 4 },
    { text: 'Maio', value: 5 },
    { text: 'Junho', value: 6 },
    { text: 'Junho', value: 7 },
    { text: 'Agosto', value: 8 },
    { text: 'Setembro', value: 9 },
    { text: 'Outubro', value: 10 },
    { text: 'Novembro', value: 11 },
    { text: 'Dezembro', value: 12 }
];

let controleName = ''
function controleNameFn(name: string) {
    if (controleName != name)
        controleName = name
}
</script>

<template>
    <van-nav-bar fixed title="Rotas">
        <template #left>
            <router-link to="/">
                <mdicon size="30" name="keyboard-backspace" />
            </router-link>
        </template>
    </van-nav-bar>
    <div style="margin-top: 50px;">
        <van-row>
            <van-col span="20">
                <van-cell-group inset>
                    <van-dropdown-menu>
                        <van-dropdown-item v-model="ano" :options="anoOptions" />
                        <van-dropdown-item v-model="ano" :options="anoOptions" />
                        <van-dropdown-item v-model="mes" :options="mesOptions" />
                    </van-dropdown-menu>
                </van-cell-group>
            </van-col>
            <van-col span="4">
                <van-button
                    @click="getRotas()"
                    class="mt-1"
                    icon="search"
                    round
                    plain
                    hairline
                    type="primary"
                ></van-button>
            </van-col>
        </van-row>

        <van-list
            v-model:loading="loadRotas"
            :finished="loadRotas"
            finished-text="Finished"
            class="ma-3"
        >
            <van-row>
                <van-col span="7" class="text-center">Data</van-col>
                <van-col span="5" class="text-right">Km inicial</van-col>
                <van-col span="5" class="text-center">Km Final</van-col>
                <van-col span="3" class="text-right">Distancia</van-col>
                <van-col span="4" class="text-center">geo</van-col>
            </van-row>

            <van-cell
                v-for="item in state.rotas"
                :class="Number(item.b_data.substring(8)) % 2 == 0 ? 'linha-par' : ''"
            >
                <div v-if="controleName != item.name">{{ item.name }}</div>

                <van-row>
                    <van-col span="7" class="text-center pt-1">{{ dataBrasil(item.b_data) }}</van-col>
                    <van-col span="5" class="text-right pt-1">{{ item.b_km }}</van-col>
                    <van-col span="5" class="text-right pt-1">{{ item.f_km }}</van-col>
                    <van-col span="3" class="text-right pt-1">
                        {{ //@ts-ignore
                            item.distancia
                        }}
                    </van-col>
                    <van-col span="4" class="text-right pt-1">
                        <!-- <van-button type="primary" size="mini" round plain hairline> -->
                        <mdicon @click="openLink(item)" name="map-marker-distance" />
                        <!-- </van-button> -->
                    </van-col>
                </van-row>
            </van-cell>
        </van-list>
    </div>
</template>