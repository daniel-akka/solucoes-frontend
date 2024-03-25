<template>
    <BaseModal>
        
        <MsgSucess v-show="show_sucess" :mensagem="msg_sucess"/>
        <MsgAlerta v-show="show_erro" :mensagem="msg_erro" />

        <!-- Main modal -->
        <div class="relative top-20 p-4 w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Recuperação de Senha:
                        </h3>
                        <button v-on:click="close()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5 space-y-4">
                        
                        <label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu Email</label>
                        <div class="relative mb-6">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                </svg>
                            </div>
                            <input type="email" v-model="email" v-on:blur="verificaEmail()" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="seuemail@flowbite.com">
                            
                        </div>
                        <p v-show="show_msg_email" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">{{ msg_email }}</span></p>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" @click="enviarEmail()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Recuperar Email</button>
                        <button v-on:click="close()" type="button" 
                            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Cancelar</button>
                    </div>
                </div>
        </div>
    </BaseModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecoveryPasswordServices from '@/services/RecoveryPasswordServices'
import BaseModal from '@/components/BaseModal.vue'
import MsgSucess from '../MsgSucess.vue'
import MsgAlerta from '../MsgAlerta.vue'

const services = new RecoveryPasswordServices()

export default defineComponent({
    name: 'FormRecoveryPasswordSend',
    data(){
        return{
            email: '',
            show_msg_email: false,
            msg_email: '',
            show_sucess: false,
            msg_sucess: 'Email enviado com sucesso!',
            show_erro: false,
            msg_erro: 'Ocorreu um erro ao enviar o Email, tente novamente!'
        }
    },
    components: {BaseModal, MsgSucess, MsgAlerta},
    methods: {
        close(){
            this.$emit('close')
        },
        async enviarEmail(){

            if (this.verificaEmail()){

            
                const response = await services.enviarEmail(this.email).then(resp => {

                    
                    if (resp.status == 200){

                        this.show_sucess = true
                        this.msg_sucess = resp.data

                        setTimeout(() => {
                            this.show_sucess = false
                            this.close()
                        }, 3000);
                    }else {

                        this.show_erro = true
                        this.msg_erro = resp.data
                        setTimeout(() => {
                            
                            this.show_erro = false
                        }, 3000);
                    }
                    

                }).catch(erro => {

                    console.log(erro.response.data)
                    this.show_erro = true
                    this.msg_erro = erro.response.data
                    setTimeout(() => {
                        
                        this.show_erro = false
                    }, 4000);
                })

            }
            
        },
        verificaEmail(): boolean{

            if (this.email == ''){

                this.msg_email = 'Informe seu email'
                this.show_msg_email = true
                return false
            }else{
                this.msg_email = 'Aguarde um momento...'
                this.show_msg_email = true
                return true
            }
        }
    }
})
</script>
