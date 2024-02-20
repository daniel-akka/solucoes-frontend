<template>
    <div class="max-w-full p-0 m-1 mx-auto bg-white border-2 border-red-200 rounded-lg sm:p-8 dark:bg-red-800 dark:border-red-700">
            
            <div class="mb-6">
                <label for="descricao_problema" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição do Problema:</label>
                <textarea v-model="form.descricao_problema" id="descricao_problema" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Escreva uma descricao do problema..."></textarea>
            </div>

            <!-- LINKS -->
            <div>   
                
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="link">Links:</label>
                <div class="border-2 rounded-lg p-2">
                    
                    <input v-on:change="addLink()" v-model="link_atual" 
                        class="mt-2 w-full text-sm focus:ring-red-500 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                        type="text" placeholder="http://">

                    <select v-show="(form.links.length > 0)" 
                        v-model="model_links"
                        multiple id="countries_multiple" 
                        class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500">
                        <option v-for="link in form.links" :value="link" @dblclick="removeLink(link)" 
                            >{{ link }}</option>
                    </select>                  
                </div>
            </div>

            <!-- Lista de Input Files de IMAGEM -->
            <div class="mt-5">
                
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload de Imagens:</label>
                <div class="border-2 rounded-lg p-2">
                    
                    <input v-for="(item, index) in lista_imagens" :id="'imgItem' + index" 
                        v-on:change="addImagem(index)" 
                        class="mt-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"
                        accept=".png, .jpg, .jpeg">
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG, JPEG (MAX. 5MB).</p>
                    
                </div>
            </div>


            <!-- Lista de Input Files de DOCUMENTO -->
            <div class="mt-5">
                
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload de Documentos:</label>
                <div class="border-2 rounded-lg p-2">
                    <input v-for="(item, index) in lista_documentos" :id="'docItem' + index" 
                        v-on:change="addDocumento(index)"
                        class="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"
                        accept=".doc, .docx, .txt, .pdf">
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">TXT, DOC, DOX, PDF (MAX. 10MB).</p>
                    
                </div>
            </div>
            
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import InputImageFile from '@/components/inputs/InputImageFile.vue'
import InputDocFile from '@/components/inputs/InputDocFile.vue'
import InputVideoFile from '@/components/inputs/InputVideoFile.vue'
import InputLinkText from '@/components/inputs/InputLinkText.vue'

export default defineComponent({
    name: 'FormProblemaCad',
    components: {
        InputImageFile,
        InputDocFile,
        InputVideoFile,
        InputLinkText
    },
    data() {
        let arr_link: string[] = []
        return{
            newLink: '',
            link_atual: '',
            model_links: null,
            form: {
                resumo: '',
                descricao_problema: '',
                links: arr_link
            }
        }
    },
    setup () {
        
        let array_numero_img: number[] = [1]
        let array_numero_doc: number[] = [1]
        let array_numero_link: number[] = [1]
        let array_string_link: string[] = []

        let lista_imagens = ref(array_numero_img) 
        let lista_documentos = ref(array_numero_doc)
        let lista_indice_links = ref(array_numero_link)

        let lista_links = ref(array_string_link)

        return { lista_imagens, lista_documentos, lista_indice_links,
        lista_links }
    },
    created(){
        
    },
    methods: {
        addImagem(indice: number){

            let id = 'imgItem' + indice
            let itemHtml = document.getElementById(id)
            
            if (itemHtml){
                this.lista_imagens.push(this.lista_imagens.length + 1)
            }
            
        },
        addDocumento(indice: number){

            let id = 'docItem' + indice
            let itemHtml = document.getElementById(id)

            if (itemHtml){
                this.lista_documentos.push(this.lista_documentos.length + 1)
            }

        },
        addLink(){

            
            if(this.link_atual != ''){

                if (this.lista_links.find(l => l == this.link_atual)){
                    alert('Este link já foi adicionado')
                }else {
                    
                    this.form.links.push(this.link_atual)
                    this.link_atual = ''
                }

            }
            
            
        },
        removeLink(link: string){
            
            this.form.links.splice(this.form.links.indexOf(link))
            this.link_atual = ''
        }
    }
})
</script>

<style scoped>

</style>