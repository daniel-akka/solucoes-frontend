<template>
    <div>
        
        <div v-show="erro_show">
            <MsgAlerta :mensagem="mensagem"/>
        </div>

        <FormLogin @mostrar-erro="mostrarErro"/>
    </div>

    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormLogin from '../components/forms/FormLogin.vue'
import MsgAlerta from '@/components/MsgAlerta.vue'

export default defineComponent({
    name: 'LoginPage',
    data() {
        return{
            erro_show: false,
            mensagem: ''
        }
    },
    components: {
        FormLogin, MsgAlerta
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