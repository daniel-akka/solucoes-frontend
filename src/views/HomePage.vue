<template>
    <div>
        <NavHeader />

        <div v-if="(opcao_pagina == 'L')">
            <HomeListaSituacoes :opcao="opcao_pagina" 
            :lista_situacoes_home="lista_situacoes_home"
            :atualizar="atualizar_lista" @pagina-cadastrar="paginaCadastrar"/>
        </div>
        <div v-if="(opcao_pagina == 'C')">
            <PaginaCadastrarSituacao :key="indexKeyCad"
                 @pagina-listar="paginaListar"/>
        </div>

        <HomeFooter />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Component } from 'vue'
import NavHeader from '@/components/NavHeader.vue'
import HomeFooter from '@/components/HomeFooter.vue'
import HomeListaSituacoes from '@/components/HomeListaSituacoes.vue'
import PaginaCadastrarSituacao from '@/components/PaginaCadastrarSituacao.vue'

export default defineComponent({
    name: 'HomePage',
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
            lista_situacoes_home,
            props
        }
    },
    created(){
        this.lista_situacoes_home.splice(0)
        if (localStorage.id_usuario == ''){
            this.$router.push('login')
        }
    },
    methods: {
        paginaCadastrar(lista: Object, id: string){
            this.indexKeyCad++
            localStorage.id_situacao = id
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
