<template>
    <div class="max-w-full p-0 m-1 mx-auto bg-white border-2 border-red-200 rounded-lg sm:p-8 dark:bg-red-800 dark:border-red-700">
            <div class="mb-6">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição do Problema:</label>
                <textarea v-model="form.descricao_problema" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Escreva uma descricao do problema..."></textarea>
            </div>

            <!-- Lista de Input Files de IMAGEM -->
            <div>
                
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload de Imagens:</label>
                <ul class="border-2 rounded-lg p-2">
                    <li v-for="(item, index) in lista_imagens" :id="'imgItem' + index" v-on:change="addImagem(index)" 
                    class="mt-2">
                        <InputImageFile />
                    </li>
                    
                </ul>
            </div>


            <!-- Lista de Input Files de DOCUMENTO -->
            <div class="mt-5">
                
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload de Documentos:</label>
                <ul class="border-2 rounded-lg p-2">
                    <li v-for="(item, index) in lista_documentos" :id="'docItem' + index" v-on:change="addDocumento(index)" 
                    >
                        <InputDocFile />
                    </li>
                    
                </ul>
            </div>
            
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import InputImageFile from '@/components/inputs/InputImageFile.vue'
import InputDocFile from '@/components/inputs/InputDocFile.vue'
import InputVideoFile from '@/components/inputs/InputVideoFile.vue'

export default defineComponent({
    name: 'FormProblemaCad',
    components: {
        InputImageFile,
        InputDocFile,
        InputVideoFile
    },
    data() {
        return{
            form: {
                resumo: '',
                descricao_problema: ''
            }
        }
    },
    setup () {
        
        let array_numero_img: number[] = [1]
        let array_numero_doc: number[] = [1]

        let lista_imagens = ref(array_numero_img) 
        let lista_documentos = ref(array_numero_doc)

        return { lista_imagens, lista_documentos }
    },
    methods: {
        addImagem(indice: number){

            let id = 'imgItem' + indice
            let itemHtml = document.getElementById(id)?.innerText
            
            if (itemHtml){
                this.lista_imagens.push(this.lista_imagens.length + 1)
            }
            
        },
        addDocumento(indice: number){

            let id = 'docItem' + indice
            let itemHtml = document.getElementById(id)?.innerText

            if (itemHtml){
                this.lista_documentos.push(this.lista_documentos.length + 1)
            }

        }
    }
})
</script>

<style scoped>

</style>