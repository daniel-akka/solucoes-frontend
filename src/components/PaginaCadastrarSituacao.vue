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
    data() {
        return {
            
        }
    },
    emits: ['paginaListar'],
    methods: {
        redirecionaPaginaListar(){
            this.$emit('paginaListar')
        }
    }
})
</script>

<style scoped>

</style>