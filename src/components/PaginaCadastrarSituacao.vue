<template>
    <div>
        <FormCadastrarSituacao :user="usuario" :idSituacaoParam="id_sit_local" @redireciona-pagina-listar="redirecionaPaginaListar" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormCadastrarSituacao from './forms/FormCadastrarSituacao.vue'
import UsuarioSimples from '@/classes/ClUsuarioSimples'
import SituacaoRecord from '@/classes/dto/ClSituacaoRecord'

let usuario_logado = new UsuarioSimples()

export default defineComponent({
    name: 'PaginaCadastrarSituacao',
    props:{
        user: Object,
        situacaParam: Object,
        idSituacaoParam: Object
    },
    components: {
        FormCadastrarSituacao
    },
    setup(){
        
        let situacao_local = new SituacaoRecord()
        let usuario = UsuarioSimples
        let situacao = SituacaoRecord
        let id_sit_local = new String()
        return{
            situacao_local, usuario, situacao, id_sit_local
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
        Object.assign(this.situacao, this.$props.situacaParam)
        Object.assign(this.situacao_local, this.situacao)
        Object.assign(this.id_sit_local, this.$props.idSituacaoParam)
        console.log('Id situacao:' + this.id_sit_local)
    }
})
</script>

<style scoped>

</style>