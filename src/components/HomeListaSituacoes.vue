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
                    <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquisar por Situações">
                </div>

                <button type="button" class="flex flex-col p-4 mt-4 border focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Nova Situação</button>
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
                    <tr v-for="sit in lista_situacoes" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th v-show="false" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {{ sit.id }}
                        </th>
                        <td scope="row" class="pr-6 pb-4 pt-1 pl-6">
                            <p class="pt-4 font-medium text-red-700 whitespace-nowrap dark:text-white">
                                {{ sit.resumo }}
                            </p>
                            <p >
                                {{ sit.descricao_problema }}
                            </p>
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>

    </div>
</template>

<script lang="ts">
import UsuarioSimples from '@/classes/ClUsuario';
import Situacoes from '@/interfaces/Situacoes'
import api from '@/services/api';
import { defineComponent, ref } from 'vue'

let usuario_logado = new UsuarioSimples()

export default defineComponent({
    name: 'HomeListaSituacoes',
    props: {
        user: Object
    },
    setup() {

            let situacoes_array = new Array<Situacoes>()

            let lista_situacoes = ref([{
                id: '',
                resumo: '',
                descricao_problema: ''
            }])

            return {
                situacoes_array,
                lista_situacoes
            }
        },
    created() {
        
        Object.assign(usuario_logado, this.user)
        this.getSituacoesUsuario(usuario_logado)
    },
    methods: {
        async getSituacoesUsuario(usuario: UsuarioSimples){

           
            let qs = require('qs')
            await api.get('home/user_id=' + usuario.id)
                .then((resp) => { Object.assign(this.situacoes_array, resp.data)})
                .catch((erro) => {console.log('Nenhum Registro encontrado!')})

                Object.assign(this.lista_situacoes, this.situacoes_array)
                
        }
    }
})
</script>

<style scoped>

</style>