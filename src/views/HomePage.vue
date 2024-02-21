<template>
    <div>
        <NavHeader />

        <div v-if="(opcao_pagina == 'L')">
            <HomeListaSituacoes :user="usuario" :opcao="opcao_pagina" 
            :lista_situacoes_home="lista_situacoes_home"
            :atualizar="atualizar_lista" @pagina-cadastrar="paginaCadastrar"/>
        </div>
        <div v-if="(opcao_pagina == 'C')">
            <PaginaCadastrarSituacao :user="usuario" :key="indexKeyCad" @pagina-listar="paginaListar"/>
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

let usuario_logado = new UsuarioSimples()

export default defineComponent({
    name: 'HomePage',
    props: {
        user: Object
    },
    components: {
        NavHeader,
        HomeFooter,
        HomeListaSituacoes,
        PaginaCadastrarSituacao
    },
    data() {
        return{
            usuario: UsuarioSimples
        }
    },
    setup() {
        let opcao_pagina = ref('L') //L - Listar; V - Visualizar; E - Editar; C - Criar
        let atualizar_lista = true
        let pagina = ref(PaginaCadastrarSituacao)
        let indexKeyCad = ref(0)


        let lista_situacoes_home = ref([{
                id: '',
                resumo: '',
                descricao_problema: ''
            }])

        
        return{
            opcao_pagina,
            pagina,
            indexKeyCad,
            atualizar_lista,
            lista_situacoes_home
        }
    },
    created(){
        this.lista_situacoes_home.splice(0)
    },
    mounted(){
        Object.assign(usuario_logado, this.user)
        Object.assign(this.usuario, this.$props.user)
    },
    methods: {
        paginaCadastrar(lista: Object){
            this.indexKeyCad++
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
