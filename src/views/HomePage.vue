<template>
    <div>
        <NavHeader />

        <div v-if="(opcao_pagina == 'L')">
            <HomeListaSituacoes :user="usuario_logado" :opcao="opcao_pagina" 
            :lista_situacoes_home="lista_situacoes_home"
            :atualizar="atualizar_lista" @pagina-cadastrar="paginaCadastrar"/>
        </div>
        <div v-if="(opcao_pagina == 'C')">
            <PaginaCadastrarSituacao :key="indexKeyCad" :idSituacaoParam="id_Situacao" :user="usuario_logado"  @pagina-listar="paginaListar"/>
        </div>

        <HomeFooter />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavHeader from '@/components/NavHeader.vue'
import HomeFooter from '@/components/HomeFooter.vue'
import HomeListaSituacoes from '@/components/HomeListaSituacoes.vue'
import PaginaCadastrarSituacao from '@/components/PaginaCadastrarSituacao.vue'
import UsuarioSimples from '@/classes/ClUsuarioSimples'

export default defineComponent({
    name: 'HomePage',
    props: {
        user: {
            type: UsuarioSimples,
            required: true
        }
    },
    components: {
        NavHeader,
        HomeFooter,
        HomeListaSituacoes,
        PaginaCadastrarSituacao
    },
    setup(props) {
        let opcao_pagina = ref('L') //L - Listar; V - Visualizar; E - Editar; C - Criar
        let atualizar_lista = true
        let pagina = ref(PaginaCadastrarSituacao)
        let indexKeyCad = ref(0)
        let usuario_logado = new UsuarioSimples()

        let lista_situacoes_home = ref([{
                id: '',
                resumo: '',
                descricao_problema: ''
            }])

            let id_Situacao = new String()

        return{
            usuario_logado,
            opcao_pagina,
            pagina,
            indexKeyCad,
            atualizar_lista,
            lista_situacoes_home,
            id_Situacao,
            props
        }
    },
    created(){
        this.lista_situacoes_home.splice(0)

        if (typeof(this.$route.params.id) == 'string'){
            this.usuario_logado.id = this.$route.params.id
        }
        
    },
    methods: {
        paginaCadastrar(lista: Object, id: string){
            this.indexKeyCad++
            this.id_Situacao = id 
            this.opcao_pagina = 'C'
            this.atualizar_lista = false
            
            Object.assign(this.lista_situacoes_home, lista)
        },
        paginaListar(atualizar: boolean){
            this.opcao_pagina = 'L'
            this.atualizar_lista = atualizar
        }
    }
})
</script>
