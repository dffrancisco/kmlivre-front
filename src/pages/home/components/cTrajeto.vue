<script lang="ts" setup>
import { ref } from 'vue'
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

const km = ref('')
const edtKm = ref()

function finalizarTrajeto() {
    if (km.value == '') {
        util.show({
            msg: 'Informe o KM para continuar',
            onClose: () => {
                edtKm.value.focus()
            }
        })
        return;
    }

    actions.finalizarTrajeto(km.value)
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
                    <van-cell-group inset>
                        <van-field type="number" v-model="km" label="KM" placeholder="KM Inicial" />
                    </van-cell-group>

                    <van-button round type="primary" class="mt-5">
                        <mdicon name="routes" />Iniciar Trajeto
                    </van-button>
                </div>

                <div v-show="trajeto?.b_data && !trajeto?.f_data" class="text-center">
                    <van-cell-group inset>
                        <van-field
                            ref="edtKm"
                            type="number"
                            v-model="km"
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