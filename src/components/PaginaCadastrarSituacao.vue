<template>
    <div>
        <FormCadastrarSituacao :user="usuario" @redireciona-pagina-listar="redirecionaPaginaListar" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormCadastrarSituacao from './forms/FormCadastrarSituacao.vue'
import UsuarioSimples from '@/classes/ClUsuarioSimples'

let usuario_logado = new UsuarioSimples()

export default defineComponent({
    name: 'PaginaCadastrarSituacao',
    props:{
        user: Object
    },
    components: {
        FormCadastrarSituacao
    },
    data() {
        return {
            usuario: UsuarioSimples
        }
    },
    emits: ['paginaListar'],
    methods: {
        redirecionaPaginaListar(atualizar: boolean){
            this.$emit('paginaListar', atualizar)
        }
    },
    created(){
        Object.assign(usuario_logado, this.user)
        Object.assign(this.usuario, this.$props.user)
    }
})
</script>

<style scoped>

</style>