<template>
    <div>
        <FormCadastrarSituacao @redireciona-pagina-listar="redirecionaPaginaListar" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormCadastrarSituacao from './forms/FormCadastrarSituacao.vue'

export default defineComponent({
    name: 'PaginaCadastrarSituacao',
    components: {
        FormCadastrarSituacao
    },
    emits: ['paginaListar'],
    methods: {
        redirecionaPaginaListar(atualizar: boolean){
            this.$emit('paginaListar', atualizar)
        }
    }
})
</script>

<style scoped>

</style>