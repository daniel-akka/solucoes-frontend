<template>
    <div class="max-w-full p-0 m-1 mx-auto bg-white border-2 border-red-200 rounded-lg sm:p-8 dark:bg-red-800 dark:border-red-700">
            
            <div class="mb-6">
                <label for="descricao_input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição do Problema:</label>
                <textarea v-model="mdl_descricao_problema" v-on:blur="blurDescricao()" id="descricao_input" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Escreva uma descricao do problema..."></textarea>
            </div>

            <!-- LINKS -->
            <div>   
                
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="link">Links:</label>
                <div class="border-2 rounded-lg p-2" id="dropDownLink">
                    
                    <input v-on:change="addLink()" v-model="link_atual" 
                        class="mt-2 w-full text-sm focus:ring-red-500 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                        type="text" placeholder="http://">

                    <ul v-show="(situacao.problema_links.length > 0)" 
                        multiple id="countries_multiple" 
                        class="mt-2 overflow-y-scroll overflow-x-hidden h-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" 
                        >
                        <li v-for="(link, index) in situacao.problema_links" 
                            :value="link.url" @dblclick="removeLink(link)" 
                            :id="'link' + index"
                            @click="selectLink('link' + index) "
                            >{{ link.url }}</li>
                    </ul> 

                </div>
            </div>
        
            
            <!-- Lista de Input Files de IMAGEM -->
            <div class="mt-5">
                
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload de Imagens:</label>
                <div class="border-2 rounded-lg p-2">
                    
                    <input v-on:change="addImagem($event)" 
                        :ref="imagem_atual" 
                        class="mt-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"
                        accept=".png, .jpg, .jpeg">
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG, JPEG (MAX. 5MB).</p>
                    
                    <select v-show="(form.imagens.length > 0)" 
                        v-model="model_imagens"
                        multiple id="imagem_multiple" 
                        class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500">
                        <option v-for="img in form.imagens" :value="img" @dblclick="removeImagem(img)" 
                            >{{ img }}</option>
                    </select> 
                </div>
            </div>


            <!-- Lista de Input Files de DOCUMENTO -->
            <div class="mt-5">
                
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload de Documentos:</label>
                <div class="border-2 rounded-lg p-2">
                    <input v-for="(item, index) in lista_documentos" :id="'docItem' + index" 
                        v-on:change="addDocumento(index)"
                        class="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" type="file"
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
import UsuarioSimples from '@/classes/ClUsuarioSimples'
import SituacaoRecord from '@/classes/dto/ClSituacaoRecord'
import Link from '@/classes/ClLink'


let usuario_logado = new UsuarioSimples()


export default defineComponent({
    name: 'FormProblemaCad',
    emits: ['paginaListar', 'setSituacao', 'setDescricao'],
    props:{
        user: Object,
        param_situacao: SituacaoRecord,
        resumo: String,
        descricao: String
    },
    components: {
        InputImageFile,
        InputDocFile,
        InputVideoFile,
        InputLinkText
    },
    data() {
        let arr_string: string[] = []
        let arr_str_imagem: string[] = []
        let userSimples = new UsuarioSimples()
        let sit = new SituacaoRecord()

        return{
            usuario: UsuarioSimples,
            newLink: '',
            link_atual: '',
            imagem_atual: '',
            mdl_descricao_problema: ref(''),
            model_links: null,
            model_imagens: null,
            file_img: ref<File | null>(),
            situacao: ref(sit),
            form: {
                usuario: userSimples,
                resumo: '',
                descricao_problema: '',
                links: arr_string,
                imagens: arr_str_imagem,
                docs: arr_string
            }
        }
    },
    created() {
        
        Object.assign(usuario_logado, this.user)
        Object.assign(this.usuario, this.$props.user)
        Object.assign(this.situacao, this.param_situacao)

        this.form.usuario = usuario_logado
        this.situacao.id_usuario = usuario_logado.id
    },
    setup () {

        const file = {
            file: ref<File | null>(),
            name: '',
            extension: '',
            type: '',
            size: 0.0,
            text: '',
            buffer: ref<Promise<ArrayBuffer>>(),
            stream: ref<ReadableStream<Uint8Array>>()
        }

        let array_numero_doc: number[] = [1] 
        let lista_documentos = ref(array_numero_doc)

        let array_imagens = [file] 

        return { lista_documentos, array_imagens,
            file
         }
    },
    methods: {
        addImagem($event: Event){

            try{

                const target = $event.target as HTMLInputElement

                if (target && target.files){
                    
                    this.file_img = target.files[0]    
                    let form_f = new FormData()
                    form_f.append('file', this.file_img)                

                    if (this.form.imagens.find(i => i == this.file_img?.name)){
                        alert('Esta Imagem já foi adicionada')
                    }else {

                        this.form.imagens.push(this.file_img.name)
                        
                    }

                }else{
                    this.file_img = null
                }

            }catch(e){
                this.file_img = null
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

                if (this.situacao.problema_links.find(l => l.url == this.link_atual)){
                    alert('Este link já foi adicionado')
                    this.link_atual = ''
                }else {
                    
                    let var_link = new Link
                    var_link.titulo = ''
                    var_link.url = this.link_atual

                    this.situacao.problema_links.push(var_link)
                    this.link_atual = ''

                }

            }
                        
        },
        removeLink(link: Link){
            
            const item = this.situacao.problema_links.findIndex(l => l.url == link.url)
            if (item > -1){
                this.situacao.problema_links.splice(item, 1)
            }
            
        },
        removeImagem(imagem: string){
            
            console.log('imagem remover: ' + imagem)
            this.form.imagens.splice(this.form.imagens.indexOf(imagem), 1)
            this.imagem_atual = ''
        },
        selectLink(id_: string){
            
           let el = document.getElementById(id_)
           if (el){el}
        },
        blurDescricao(){
            this.situacao.problema_descricao = this.mdl_descricao_problema
            this.$emit('setDescricao', this.situacao.problema_descricao)
            //Object.assign(this.$props.param_situacao, this.situacao)
        }
    },
    watch:{
        resumo(newValue, oldValue){
            this.situacao.situacao_resumo = this.$props.resumo || ''
        },
        situacao(newValue, oldValue){
            this.$emit('setSituacao', this.situacao)
        }
    }
})
</script>

<style scoped>

</style>