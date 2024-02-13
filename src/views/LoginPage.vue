<template>
    <div>
        
        <a v-show="erro_show" href="#" class="block centralizar max-w-sm p-2 bg-red-400 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <h5 class="mb-2 text-1x1 text-center font-bold tracking-tight text-gray-900 dark:text-white">
                {{ mensagem }}
            </h5>

        </a>

        <FormLogin @mostrar-erro="mostrarErro"/>
    </div>

    <router-view />
</template>

<script lang="ts">
import { defineComponent, setTransitionHooks } from 'vue'
import FormLogin from '../components/forms/FormLogin.vue'

export default defineComponent({
    name: 'LoginPage',
    data() {
        return{
            erro_show: false,
            mensagem: ''
        }
    },
    components: {
        FormLogin
    },
    methods: {
        mostrarErro(sim_: boolean, msg_: string){
            this.erro_show = sim_
            this.mensagem = msg_
            setTimeout(() => {
                this.erro_show = false
            }, 2500);
        }
    }
})
</script>

<style scoped>
.centralizar{
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>