<template>
    <div>

        <div class="centraliza-div-form-login w-lvw max-w-md border-t-4 border-t-emerald-800 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

            <form class="space-y-6">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white margem">Nova Conta</h5>
                <div class="mb-5">
                    <label for="login" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu Login:</label>
                    <input type="text" v-model="login" v-on:blur="verificaLogin" id="login" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" required>                
                    <p v-show="existe_login" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Esse Login não está disponível!</p>                    
                </div>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu email:</label>
                    <input type="email" v-model="email" v-on:blur="verificaEmail" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" placeholder="name@gmail.com" required>
                    <p v-show="existe_email" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Esse Email não está disponível!</p>
                </div>
                <div class="mb-5">
                    <label for="senha" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua senha:</label>
                    <input type="password" v-model="senha" v-on:blur="verificaSenha()" id="senha" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" required>
                </div>
                <div class="mb-5">
                    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repetir Senha:</label>
                    <input type="password" v-model="senha_repet" v-on:blur="verificaSenha()" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" required>
                    <div v-show="show_msg_senha">
                        <p v-show="senhas_iguais == false" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> As senhas estão diferentes!</p>
                    </div>
                </div>
                <div class="flex items-start mb-5">
                    <div class="flex items-center h-5">
                    <input id="terms" v-model="terms" type="checkbox" :value="terms" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required>
                    </div>
                    <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Eu concordo com os <a href="#" class="text-emerald-600 hover:underline dark:text-emerald-500">termos e condições</a></label>
                </div>
                <button type="submit" @click="salvarUsuario($event)" 
                    class="w-full mb-1 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    Registrar nova Conta
                </button>
                <button type="button" v-on:click="pageLogin()"
                    class="w-full mt-0 py-2.5 px-5 me-2 mb-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-emerald-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Cancelar</button>
            </form>
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
import '../../global-css/centraliza-div.css'
import api from '@/services/api'
import MsgAlerta from '../MsgAlerta.vue'
import MsgSucess from '../MsgSucess.vue'
import UsuarioConsulta from '@/interfaces/UsuarioConsulta'
import Usuario from '@/classes/ClUsuarioSimples'

let lista_usuarios = new Array<UsuarioConsulta>()
let usuario = new Usuario()

export default defineComponent({
    name: 'FormCreateAccount',
    components: {
        MsgAlerta,
        MsgSucess
    },
    data() {
        return {
            login: '',
            senha: '',
            email: '',
            senha_repet: '',
            senhas_iguais: false,
            terms: false,
            show_login_msg: false,
            show_email_msg: false,
            existe_login: false,
            existe_email: false,
            pode_salvar: false,
            show_msg_senha: false,
            show_alerta: false,
            msg: '',
            sucesso: true
        }
    },
    created() {
        this.buscaUsuariosDoSistema()
    },
    methods: {
        async buscaUsuariosDoSistema(){

            await api.get('newAccount').then(
                (resp) => {
                    Object.assign(lista_usuarios, resp.data)
                }
            )
        },
        async salvarUsuario(e: Event){
            e.preventDefault()

            this.validaCamposForm()

            this.show_alerta = false
            
            if (this.pode_salvar){

                usuario.login = this.login
                usuario.email = this.email
                usuario.senha = this.senha

                let entity = {
                    "login": this.login,
                    "email": this.email,
                    "senha": this.senha
                }

                await api.post('newAccount', entity)
                .then((resp) => {
                    this.show_alerta = true
                    this.sucesso = true
                    this.msg = 'Usuário ' + this.login + ' cadastrado com sucesso! Redirecionando...'
                    setTimeout(() => {
                        this.$router.push('login')
                    }, 3000)
                })
                    .catch(erro => {
                        this.show_alerta = true
                        this.sucesso = false
                        setTimeout(() => {
                            this.msg = JSON.stringify(erro.data)
                            this.show_alerta = false
                        }, 4000)
                        
                    })
                
            } else {
                
                this.sucesso = false
                this.show_alerta = true
                setTimeout(() => {
                    this.show_alerta = false
                }, 4000)
            }
            
        },
        verificaLogin(){

            this.show_login_msg = true
            //se já existir um login no banco
            if (lista_usuarios.find(u => u.login == this.login)){
                this.existe_login = true
                this.msg = 'Verifique se o Login está disponível'
            } else {

                this.existe_login = false
                setTimeout(() => {
                    this.show_login_msg = false    
                }, 4000);
            }

        },
        verificaEmail(){

            this.show_email_msg = true
            //se já existir um email no banco
            if (lista_usuarios.find(u => u.email == this.email)){
                this.existe_email = true
                this.msg = 'Verifique se o Email está disponível'
            } else {
                this.existe_email = false
                setTimeout(() => {
                    this.show_email_msg = false    
                }, 3000);
            }

        },
        verificaSenha(){

            this.pode_salvar = false
            this.show_msg_senha = false
            if (this.senha != '' && this.senha_repet != ''){

                this.show_msg_senha = true
                this.senhas_iguais = (this.senha == this.senha_repet)

                if (this.senhas_iguais == false)
                {this.msg = 'Verifique se as senhas são iguais'}
            }
        },
        validaCamposForm(){
            this.pode_salvar = true

            if (this.existe_login || this.existe_email || 
            (this.senhas_iguais == false) || 
            (this.terms == false)){

                this.pode_salvar = false
            }
        },
        pageLogin(){

            localStorage.id_usuario = ''
            this.$router.push('login')
        }
    }
})
</script>

<style scoped>
.margem {
    margin-bottom: 12px;
}
</style>@/classes/ClUsuarioSimples