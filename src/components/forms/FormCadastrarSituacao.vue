<template>

        <div>

            <div v-show="mostrar_msg">
                <div v-if="sucesso"><MsgSucess :mensagem="mensagem"/></div>
                <div v-else><MsgAlerta :mensagem="mensagem"/></div>
            </div>

            <div class="max-w-2xl p-4 mx-auto my-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="my-0 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                    Cadastro de Situação
                </h5>
                <hr class="mt-2 mb-5 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-2" />
                <a href="#" v-on:click="paginaListar(false)" class="ms-auto text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-500"> Lista de Situações </a>
                
                <h5 class="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white">Situação:</h5>
                <div class="mb-6">
                    <label for="resumo_parent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resumo da Situação:</label>
                    <input v-model="nova_situacao.situacao_resumo" type="text" id="resumo_parent" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" autofocus required>
                </div>
                
                <h5 class="block mb-2 text-sm text-center font-medium text-red-700 dark:text-white">Problema:</h5>

                <!-- INICIO DO FORM PROBLEMA -->
                <div class="max-w-full p-0 m-1 mx-auto bg-white border-2 border-red-200 rounded-lg sm:p-8 dark:bg-red-800 dark:border-red-700">
            
                        <div class="mb-6">
                            <label for="descricao_input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição do Problema:</label>
                            <textarea v-model="nova_situacao.problema_descricao" id="descricao_input" rows="3" 
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Escreva uma descricao do problema..."></textarea>
                        </div>

                        <!-- LINKS -->
                        <div>   
                            
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="link">Links:</label>
                            <div class="border-2 rounded-lg p-2" id="dropDownLink">
                                
                                <input v-on:change="addLink()" v-model="link_atual" 
                                    class="mt-2 w-full text-sm focus:ring-red-500 focus:border-red-500 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    type="text" placeholder="http://">

                                <ul v-show="(nova_situacao.problema_links.length > 0)" 
                                    multiple id="countries_multiple" 
                                    class="mt-2 overflow-y-scroll overflow-x-hidden h-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" 
                                    >
                                    <li v-for="(link, index) in nova_situacao.problema_links" 
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

    <!-- FIM DO FORM PROBLEMA -->

                <button type="submit" class="mr-5 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800" 
                    @click="salvarSituacao($event)">
                    Salvar Situação</button>
                    
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
                    @click="cancelar()">
                    Cancelar</button>
            </div>

        </div>
    
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormProblemaCad from './FormProblemaCad.vue'
import UsuarioSimples from '@/classes/ClUsuarioSimples'
import SituacaoRecord from '@/classes/dto/ClSituacaoRecord'
import MsgSucess from '../MsgSucess.vue'
import MsgAlerta from '../MsgAlerta.vue'
import api from '@/services/api'
import Link from '@/classes/ClLink'
import SituacaoServices from '@/services/ClSituacaoServices'
import Situacao from '@/classes/ClSituacao'

let usuario_logado = new UsuarioSimples()
let situacao_selecionada = new Situacao()
const servicos = new SituacaoServices()

export default defineComponent({
    name: 'FormCadastrarSituacao',
    components:{FormProblemaCad, MsgSucess, MsgAlerta},
    emits: ['redirecionaPaginaListar'],
    data(){
        let arr_string: string[] = []
        let arr_str_imagem: string[] = []
        let sit = new SituacaoRecord()

        return{
            nova_situacao: sit,
            newLink: '',
            link_atual: '',
            imagem_atual: '',
            mdl_descricao_problema: ref(''),
            model_links: null,
            model_imagens: null,
            mostrar_msg: false,
            sucesso: false,
            mensagem: '',
            file_img: ref<File | null>(),
                form: {
                resumo: '',
                descricao_problema: '',
                links: arr_string,
                imagens: arr_str_imagem,
                docs: arr_string
            }
        }
    },
    setup(props) {

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
            file, props
         }
    },
   async created() {

        usuario_logado.id = localStorage.id_usuario
        this.nova_situacao.id_usuario = usuario_logado.id

        if (localStorage.id_situacao){
            situacao_selecionada.id = localStorage.id_situacao
        }else{
            situacao_selecionada.id = ''
        }
          

        if(situacao_selecionada.id != ''){

            const data = await servicos.get(situacao_selecionada.id)
                .then((resp) => {
                    
                    this.nova_situacao.setSituacao(resp)
                })
            
        }else{
            this.nova_situacao = new SituacaoRecord()
        }

    },
    methods: {
        paginaListar(atualizar: boolean){
            this.$emit('redirecionaPaginaListar', atualizar)
        },
        setDescricao(descricao: string){
            this.nova_situacao.problema_descricao = descricao
        },
        setCamposFormulario(situacao_new: Situacao){

        },
        async salvarSituacao(e: Event){
            e.preventDefault()

            
            if (situacao_selecionada.id == ''){
                
                this.nova_situacao.id_usuario = usuario_logado.id
                //EXECUTA UM Request POST
                //JSON.parse(JSON.stringify(this.situacao_parent))
                await servicos.save(this.nova_situacao)
                    .then((resp) => {
                        this.mensagem = 'Situação Salva com Sucesso! Redirecionando...'
                        this.mostrar_msg = true
                        this.sucesso = true

                        setTimeout(() => {
                            this.mostrar_msg = false
                            this.$emit('redirecionaPaginaListar', true)    
                        }, 2000);
                    
                }).catch(erro => {

                    this.mensagem = 'Erro ao Salvar:: ' + erro
                    this.mostrar_msg = true
                    this.sucesso = false
                    setTimeout(() => {
                        this.mostrar_msg = false
                    }, 5000);
                    
                })

               
            }else{

                //Executa um Request PUT
                await servicos.update(situacao_selecionada.id, this.nova_situacao)
                    .then((resp) => {
                        this.mensagem = 'Situação Salva com Sucesso! Redirecionando...'
                        this.mostrar_msg = true
                        this.sucesso = true

                        setTimeout(() => {
                            this.mostrar_msg = false
                            this.$emit('redirecionaPaginaListar', true)    
                        }, 2000);
                    
                }).catch(erro => {

                    this.mensagem = 'Erro ao Salvar:: ' + erro
                    this.mostrar_msg = true
                    this.sucesso = false
                    setTimeout(() => {
                        this.mostrar_msg = false
                    }, 5000);
                    
                })
            }

        },
        cancelar(){
            this.$emit('redirecionaPaginaListar', false)
        },
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

                    if (this.nova_situacao.problema_links.find(l => l.url == this.link_atual)){
                        alert('Este link já foi adicionado')
                        this.link_atual = ''
                    }else {
                        
                        let var_link = new Link
                        var_link.titulo = ''
                        var_link.url = this.link_atual

                        this.nova_situacao.problema_links.push(var_link)
                        this.link_atual = ''

                    }

                }
                        
            },
            removeLink(link: Link){

                const item = this.nova_situacao.problema_links.findIndex(l => l.url == link.url)
                if (item > -1){
                    this.nova_situacao.problema_links.splice(item, 1)
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
            }
    }
})
</script>

<style scoped>

</style>