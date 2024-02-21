<template>

        <div class="w-full centraliza-div max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-6" @submit.prevent>
                <h5 class="text-xl font-medium text-gray-900 dark:text-white">Login do Sistema</h5>
                <div>
                    <label for="login_email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login:</label>
                    <input v-model="login_email" type="text" name="login_email" id="login_email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="login ou email" required>
                </div>
                <div>
                    <label for="senha" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua senha:</label>
                    <input v-model="senha" type="password" name="senha" id="senha" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                <div class="flex items-start">
                    <a href="#" class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Recuperar Senha?</a>
                </div>
                <button type="submit" @click="getUsuarioLogin()" class="w-full text-white bg-emerald-900 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    Entrar no Sistema
                </button>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Não tem uma Conta? <a href="#" v-on:click="pageCreateAccount()" class="text-emerald-800 hover:underline dark:text-emerald-500">Criar uma Conta</a>
                </div>
            </form>
            <div v-show="false"><HomePage :user="user"/></div>
            <router-view />
        </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import '@/global-css/centraliza-div.css'
import api from '@/services/api'
import UsuarioSimples from '@/classes/ClUsuarioSimples'
import HomePage from '@/views/HomePage.vue'


let usuario_login = new UsuarioSimples()

export default defineComponent({
    name: 'FormLogin',
    components: {
        HomePage
    },
    emit: ['mostarErro'],
    data() {
        return{
            login_email: null,
            senha: null,
            user: UsuarioSimples
        }
    },
    methods: {
        async getUsuarioLogin() {

            let usuario = {
                id: '',
                login: '',
                senha: '',
                email: ''
            }

            let OK = false

            const qs = require('qs');
            await api.get(qs.stringify({
                'login': this.login_email, 
                'senha': this.senha
            }))
                .then(response => {
                    OK = true
                    Object.assign(usuario, response.data)
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                });

            if (OK == false){
                this.$emit('mostrarErro', true, "Usuario não Encontrado");
            } else{
                
                usuario_login.id = usuario.id
                usuario_login.login = usuario.login

                Object.assign(this.user, usuario_login)
                
                this.$router.push('home')
            }  
        },
        pageCreateAccount(){
            this.$router.push('newAccount')
        }
    }
})
</script>

<style scoped>

</style>@/classes/ClUsuarioSimples