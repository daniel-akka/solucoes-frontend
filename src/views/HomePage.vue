<template>
    <div>
        <NavHeader />
        <HomeListaSituacoes :user="user"/>
        <HomeFooter />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavHeader from '@/components/NavHeader.vue'
import HomeFooter from '@/components/HomeFooter.vue'
import HomeListaSituacoes from '@/components/HomeListaSituacoes.vue'
import UsuarioSimples from '@/classes/ClUsuario'

let usuario_logado = new UsuarioSimples()

export default defineComponent({
    name: 'HomePage',
    props: {
        user: Object
    },
    components: {
        NavHeader,
        HomeFooter,
        HomeListaSituacoes
    },
    mounted(){
        Object.assign(usuario_logado, this.user)
    }
})
</script>

<style scoped>

</style>