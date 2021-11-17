<script lang="ts" setup>
import { iTrajeto } from '@/models/interfaces';
import { state } from '../home'
import { dataBrasil } from '@/ts/utils'
const props = defineProps({
    rotas: {
        type: Object as () => iTrajeto[]
    }
})

function openLink(rota: iTrajeto) {
    //@ts-ignore
    window.open(`https://www.google.com/maps/dir/${rota.b_latitude},+${rota.b_longitude}/${rota.f_latitude},+${rota.f_longitude}`, '_blank').focus();
}

</script>
<template>
    <van-list
        v-model:loading="state.loadRotas"
        :finished="state.loadRotas"
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
        <van-cell v-for="item in rotas">
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
</template>