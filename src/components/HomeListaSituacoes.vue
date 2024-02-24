<template>
    <div>      

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pb-4 bg-white dark:bg-gray-900">

                <label for="table-search" class="sr-only">Pesquisar</label>
                <div class="relative mt-1">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" v-model="text_pesquisa" @keyup="filtrarPesquisa()" 
                        id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Pesquisar por Situações">
                </div>

                <button type="button" @click="$emit('paginaCadastrar', lista_situacoes, '')" class="flex flex-col p-4 mt-4 border focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Nova Situação
                </button>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th v-show="false" scope="col" class="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Resumo da Situação
                        </th>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-if="(lista_filtrada.length > 0)" v-for="sit in lista_filtrada" 
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th v-show="false" scope="row" 
                                class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ sit.id }}
                            </th>
                            <td scope="row" class="pr-6 pb-4 pt-1 pl-6">
                                <p class="pt-2 font-medium text-red-700 whitespace-nowrap dark:text-white">
                                    {{ sit.resumo }}
                                </p>
                                <p >
                                    {{ sit.descricao_problema }}
                                </p>
                            </td>
                            <td class="px-6 py-2">
                                <button @click="$emit('paginaCadastrar', lista_situacoes, sit.id)" type="button" 
                                    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-amber-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Editar</button>
                                <!-- <a href="#" v-on:click="editarSituacao(sit.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a> -->
                            </td>
                        </tr><tr v-else class="text-center text-base font-semibold"><p>Nenhuma Situação encontrada</p></tr>
                    
                </tbody>
            </table>
        </div>

    </div>
</template>

<script lang="ts">
import UsuarioSimples from '@/classes/ClUsuarioSimples';
import Situacoes from '@/interfaces/Situacoes'
import api from '@/services/api';
import { defineComponent, ref } from 'vue'
            
export default defineComponent({
    name: 'HomeListaSituacoes',
    props: {
        user: {
            type: UsuarioSimples,
            required: true
        },
        opcao:{
            type: String,
            default: ''
        },
        atualizar: {
            type: Boolean,
            default: false
        },
        lista_situacoes_home: Object
    },
    data(){
        return{
            usuario: UsuarioSimples
        }
    },
    watch:{
        opcao(newValue, oldValue){
            let option: string = this.$props.opcao || ''
            let buscar: boolean = this.$props.atualizar || false

            console.log('Buscar: ' + buscar + '; Option: ' + option)
            if ((option == 'L') && buscar){
                console.log('entrou na funcao')
                this.getSituacoesUsuario(this.usuario_logado)
            }else{
                Object.assign(this.lista_situacoes, this.$props.lista_situacoes_home)
            }
        }
    },
    emits: ['paginaCadastrar', 'paginaEditar'],
    setup(props) {

            let situacoes_array = new Array<Situacoes>()
            let usuario_logado = new UsuarioSimples()

            let lista_situacoes = ref([{
                id: '',
                resumo: '',
                descricao_problema: ''
            }])

            let lista_filtrada = ref([{
                id: '',
                resumo: '',
                descricao_problema: ''
            }])

            let lista_zero = ref([{
                id: '',
                resumo: '',
                descricao_problema: ''
            }])


            let text_pesquisa = ref('')

            return {
                situacoes_array,
                lista_situacoes,
                lista_filtrada,
                text_pesquisa,
                lista_zero,
                usuario_logado,
                props
            }
        },
    created() {
        
        this.lista_situacoes.splice(0)
        this.lista_filtrada.splice(0)
        this.lista_zero.splice(0)

        Object.assign(this.usuario_logado, this.user)
        Object.assign(this.usuario, this.$props.user)
        let buscar: boolean = this.$props.atualizar || false
        if (buscar && (this.usuario_logado.id != '')){
            this.getSituacoesUsuario(this.usuario_logado)
        }else{
            Object.assign(this.lista_situacoes, this.$props.lista_situacoes_home)
        }
        Object.assign(this.lista_filtrada, this.lista_situacoes)
    },
    methods: {
        async getSituacoesUsuario(usuario: UsuarioSimples){

           
            let qs = require('qs')
            await api.get('home/user_id=' + usuario.id)
                .then((resp) => { Object.assign(this.situacoes_array, resp.data)})
                .catch((erro) => {console.log('Nenhum Registro encontrado!')})

                Object.assign(this.lista_situacoes, this.situacoes_array)
                Object.assign(this.lista_filtrada, this.situacoes_array)
                
        },
        filtrarPesquisa(){
            
            if (this.text_pesquisa != ''){

                const pesq = this.text_pesquisa.toUpperCase()
                this.lista_filtrada = this.lista_situacoes.filter(s => ((s.resumo.toUpperCase().indexOf(pesq) > -1) 
                || (s.descricao_problema.toUpperCase().indexOf(pesq) > -1)))
                
                if (this.lista_filtrada.length < 1){
                    this.lista_filtrada = this.lista_zero
                }else{
                    this.lista_filtrada.forEach(l => console.log(l.resumo))
                }
                
            }else{this.lista_filtrada = this.lista_situacoes}
        },
        editarSituacao(id: string){
            this.$emit('paginaEditar', this.lista_situacoes, id)
        }
    }
})
</script>
