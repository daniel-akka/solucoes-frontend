<template>
    <div>

        <div v-if="permitir_alterar">
            <div class="w-full centraliza-div max-w-sm p-4 border-t-4 border-t-emerald-800 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        

                <form class="max-w-sm mx-auto">
                    <div class="mb-5">
                        <input type="text" v-model="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" disabled>
                    </div>
                    
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua nova Senha:</label>
                        <input type="password" v-model="senha" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" required />
                    </div>
                    <div class="mb-3">
                        <label for="repeat-password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Digite a Senha novamente:</label>
                        <input type="password" v-model="senha_repetida" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" required />
                    </div>
                    <p v-show="senhas_iguais == false" class="mt-0 text-sm mb-3 text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> As senhas estão diferentes!</p>
                    <button type="submit" @click="salvarNovaSenha($event)" class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Salvar Nova Senha</button>
                </form>
            </div>
        </div>
        <div v-else>
            <h1 class="text-xl font-mediu">{{ msg }}</h1>
        </div>

        <div v-show="show_alerta">
                        <div v-if="sucesso"><MsgSucess :mensagem='msg' /></div>
                        <div v-else><MsgAlerta :mensagem='msg' /></div>
        </div>

        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MsgAlerta from '@/components/MsgAlerta.vue'
import MsgSucess from '@/components/MsgSucess.vue'
import RecoveryPasswordServices from '@/services/RecoveryPasswordServices'
import RecoveryPassword from '@/classes/ClRecoveryPassword'
import '@/global-css/centraliza-div.css'

const recoveryServices = new RecoveryPasswordServices()

export default defineComponent({
    name: 'RecoveryPassword',
    components:{
        MsgAlerta,
        MsgSucess
    },
    data() {
        let recovery_password = new RecoveryPassword()
        return{
            email: '',
            senha: '',
            senha_repetida: '',
            show_alerta: false,
            sucesso: true,
            msg: '',
            Recovery: recovery_password,
            senhas_iguais: true,
            permitir_alterar: true
        }
    },
    setup () {
        
        let idRecovery = ''
        return {idRecovery}
    },
    mounted() {

        
        try {
            let id = this.$route.query.id
            
            if (typeof id === 'string'){
                this.idRecovery = id
            }
        } catch (error) {
            this.$router.push({path: '/login'})
        }
        
        this.getRecovery()
        
    },
    methods: {
        async getRecovery(){

            if (this.idRecovery == ''){
            this.$router.push({path: '/login'})
            }else {

                const resp = await recoveryServices.getByID(this.idRecovery)        
                
                if (resp.id == ''){
                    
                    this.msg = 'Pedido de Recuperação não encontrado! Redirecionando...'
                    this.sucesso = false
                    this.show_alerta = true
                    setTimeout(() => {
                        
                        this.show_alerta = false
                    }, 3000)

                    this.$router.push({path: '/login'})
                }else{
                    Object.assign(this.Recovery, resp)

                    this.validaRecovery()

                    this.email = this.Recovery.email
                }
            }
        },
        validaRecovery(){

            if(this.Recovery.a_confirmar == false){

                this.permitir_alterar = false
                this.msg = 'Este Link já foi confirmado! Faça um novo pedido! Redirecionando...'
                setTimeout(() => {
                        this.$router.push({path: '/login'})
                }, 6000)
            }

            if(this.Recovery.dias_vencimento > 2){

                this.permitir_alterar = false
                this.msg = 'Link vencido! Atingiu o prazo de 2 dias. Faça um novo pedido!'
                setTimeout(() => {
                        this.$router.push({path: '/login'})
                }, 6000)
            }
        },
        salvarNovaSenha(e: Event){
            e.preventDefault()

            this.senhas_iguais = (this.senha == this.senha_repetida)
            let salvar = true
            if(this.senhas_iguais == false){

                salvar = false

                this.msg = 'Verifique se as senhas são iguais!'
                this.sucesso = false
                this.show_alerta = true
                setTimeout(() => {
                        this.show_alerta = false
                }, 3000)
                
            }else{

                if (this.senha == ''){
                    salvar = false

                    this.msg = 'Informe alguma senha para continuar!'
                    this.sucesso = false
                    this.show_alerta = true
                    setTimeout(() => {
                        this.show_alerta = false
                    }, 3000)
                    
                }
            }

            if (salvar){this.salvar()}
        },
        async salvar(){

            const resp = await recoveryServices.updateSenhaRecovery(this.Recovery.id, this.email, this.senha)
            .then((retorno) => {

                console.log(retorno.data)
                this.msg = retorno.data
                this.sucesso = true
                this.show_alerta = true
                setTimeout(() => {
                        this.show_alerta = false
                        this.$router.push({path: '/login'})
                }, 3000)
                
                
            }).catch((erro) => {

                console.log('ERRO:' + erro)
                this.msg = erro
                this.sucesso = false
                this.show_alerta = true
                setTimeout(() => {
                        
                    this.show_alerta = false
                    this.$router.push({path: '/login'})
                }, 4000)
                
                
            })
            

        }
    }
})
</script>

<style scoped>

</style>