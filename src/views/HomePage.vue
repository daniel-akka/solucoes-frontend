<template>
    <div>
        <NavHeader />

        <div v-if="(opcao_pagina == 'L')">
            <HomeListaSituacoes :user="user" @pagina-cadastrar="paginaCadastrar"/>
        </div>
        <div v-if="(opcao_pagina == 'C')">
            <PaginaCadastrarSituacao :key="indexKeyCad" @pagina-listar="paginaListar"/>
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
        }
    },
    setup() {
        let opcao_pagina = ref('L') //L - Listar; V - Visualizar; E - Editar; C - Criar
        
        let pagina = ref(PaginaCadastrarSituacao)
        let indexKeyCad = ref(0)

        return{
            opcao_pagina,
            pagina,
            indexKeyCad
        }
    },
    mounted(){
        Object.assign(usuario_logado, this.user)
    },
    methods: {
        paginaCadastrar(){
            this.indexKeyCad++
            this.opcao_pagina = 'C'
        },
        paginaListar(){
            this.opcao_pagina = 'L'
        }
    },
    computed: {
        componentCad(){
            return 'pagina-cadastrar-situacao'
        }
    }
})
</script>

<style scoped>

</style>@/classes/ClUsuarioSimples