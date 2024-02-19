<template>

        <div>

            <div class="max-w-2xl p-4 mx-auto my-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="my-0 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                    Cadastro de Situação
                </h5>
                <hr class="mt-2 mb-5 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-2" />
                <a href="#" v-on:click="paginaListar" class="ms-auto text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-500"> Lista de Situações </a>
                
                <h5 class="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white">Situação:</h5>
                <div class="mb-6">
                    <label for="resumo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resumo da Situação:</label>
                    <input v-model="form.resumo" type="text" id="resumo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" autofocus required>
                </div>
                <h5 class="block mb-2 text-sm text-center font-medium text-red-700 dark:text-white">Problema:</h5>
                <FormProblemaCad  :form="form"/>
            </div>

        </div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormProblemaCad from './FormProblemaCad.vue'

const input = document.getElementById('resumo')

export default defineComponent({
    name: 'FormCadastrarSituacao',
    components:{FormProblemaCad},
    emits: ['redirecionaPaginaListar'],
    data(){
        return{
            form: {
                resumo: '',
                descricao_problema: ''
            }
        }
    },
    setup () {
        

        return {}
    },
    methods: {
        paginaListar(){
            this.$emit('redirecionaPaginaListar')
        }
    }
})
</script>

<style scoped>

</style>