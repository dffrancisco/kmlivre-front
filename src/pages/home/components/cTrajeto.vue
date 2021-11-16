<script lang="ts" setup>
import { ref } from 'vue'
import { Toast } from 'vant';
import { iTrajeto } from '@/models/interfaces';
import { actions, state } from '../home'
//@ts-ignore
import util from '@/plugins/util'
import utils from '@/ts/utils';
// import moment from 'moment'

const props = defineProps({
    trajeto: {
        type: Object as () => iTrajeto
    }
})

const kmInicial = ref('')
const kmFinal = ref('')

const edtKmIncial = ref()
const edtKmFinal = ref()

async function iniciaTrajeto() {

    await actions.getGeo();

    if (kmInicial.value == '') {
        util.show({
            msg: 'Informe o KM para continuar',
            onClose: () => {
                edtKmIncial.value.focus()
            }
        })
        return;
    }

    Toast.loading({
        message: 'Iniciando...',
        forbidClick: true,
    });

    let data = await actions.iniciaTrajeto(kmInicial.value)

    Toast.clear()

    kmInicial.value = '';

    if (data.msg) {
        actions.getTrajetoAberto()
        Toast.success('Rota Inicializada');
    }

    if (data.error) {
        util.show(data.error)
        Toast.fail(data.error);
    }
}


async function finalizarTrajeto() {

    await actions.getGeo();

    if (kmFinal.value == '') {
        util.show({
            msg: 'Informe o KM para continuar',
            onClose: () => {
                edtKmFinal.value.focus()
            }
        })
        return;
    }

    if (Number(props.trajeto?.b_km) > Number(kmFinal.value)) {
        util.show('KM final não pode ser menor que o KM Inicial')
        return
    }


    Toast.loading({
        message: 'Finalizando...',
        forbidClick: true
    });

    let data = await actions.finalizarTrajeto(kmFinal.value, props.trajeto?.id_router)

    Toast.clear()

    kmFinal.value = ''

    if (data.msg) {
        actions.getTrajetoAberto()
        actions.getUltimoTrajeto()
        Toast.success('Rota Finalizada');
    }

    if (data.error) {
        util.show(data.error)
        Toast.fail(data.error);
    }

}

function setKM() {
    kmFinal.value = state.ultimoTrajeto
}


// const time = ref(30 * 60 * 60 * 100);
// const startTime = moment(props.trajeto?.b_data + ' ' + props.trajeto?.b_hora, 'YYYY-MM-DD hh:mm:ss');
// const endTime = moment('2021-11-09 11:52:53', 'YYYY-MM-DD hh:mm:ss');
// var totalHours = (endTime.diff(startTime, 'hours'));
// var totalMinutes = endTime.diff(startTime, 'minutes');


</script>

<template>
    <div class="tMain">
        <van-row>
            <van-col span="24">
                <div class="t-inf">
                    <van-row>
                        <van-col class="text-center" span="12">
                            <span class="fs-12 pr-2">Latitude:</span>
                            <label>{{ trajeto?.b_latitude }}</label>
                        </van-col>

                        <van-col class="text-center" span="12">
                            <span class="fs-12 pr-2">Longitude:</span>
                            <label>{{ trajeto?.b_longitude }}</label>
                        </van-col>

                        <van-col class="text-center" span="12">
                            <span class="fs-12 pr-2">Data</span>
                            <label>{{ utils.dataBrasil(trajeto?.b_data) }}</label>
                        </van-col>

                        <van-col class="text-center" span="12">
                            <span class="fs-12 pr-2">Hora:</span>
                            <label>{{ trajeto?.b_hora }}</label>
                        </van-col>

                        <van-col class="text-center mt-2" span="24">
                            <span class="fs-12 pr-2">KM Inicial</span>
                            <label>{{ trajeto?.b_km }}</label>
                        </van-col>
                    </van-row>

                    <!-- <van-count-down :time="trajeto?.b_hora" format="DD Dia, HH:mm:ss" /> -->
                </div>
            </van-col>
            <van-col span="24">
                <div v-show="!trajeto?.b_data" class="text-center">
                    <van-button
                        round
                        plain
                        hairline
                        type="primary"
                        size="small"
                        class="mb-3 px-5"
                        @click="setKM"
                    >Último KM {{ state.ultimoTrajeto }}</van-button>

                    <van-cell-group inset>
                        <van-field
                            ref="edtKmIncial"
                            type="number"
                            v-model="kmInicial"
                            label="KM"
                            placeholder="KM Inicial"
                        />
                    </van-cell-group>

                    <van-button @click="iniciaTrajeto()" round type="primary" class="mt-5">
                        <mdicon name="routes" class="pr-2" />Iniciar Trajeto
                    </van-button>
                </div>

                <div v-show="trajeto?.b_data && !trajeto?.f_data" class="text-center">
                    <van-cell-group inset>
                        <van-field
                            ref="edtKmFinal"
                            type="number"
                            v-model="kmFinal"
                            label="KM"
                            placeholder="KM Final"
                        />
                    </van-cell-group>

                    <van-button @click="finalizarTrajeto()" round type="success" class="mt-5">
                        <mdicon class="mr-3" name="office-building-marker-outline" />Finalizar Trajeto
                    </van-button>
                </div>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <div class="t-inf">
                    <van-row>
                        <van-col class="text-center" span="12">
                            <span class="fs-12 pr-2">Latitude:</span>
                            <label>{{ state.latitude }}</label>
                        </van-col>

                        <van-col class="text-center" span="12">
                            <span class="fs-12 pr-2">Longitude:</span>
                            <label>{{ state.longitude }}</label>
                        </van-col>
                    </van-row>
                </div>
            </van-col>
        </van-row>
        <!-- -->
    </div>
</template>

<style scoped>
.tMain {
    height: 65vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.t-inf {
    color: #62b1ff;
    background: #ecf9ff;
    margin: 15px;
    border-radius: 8px;
    padding: 10px;
}
</style>

<style>
.van-popup--center {
    left: 0 !important;
}
</style>