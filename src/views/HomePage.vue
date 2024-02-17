<template>
    <div>
        <NavHeader />
        <HomeListaSituacoes />
        <HomeFooter />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavHeader from '@/components/NavHeader.vue';
import HomeListaSituacoes from '@/components/HomeListaSituacoes.vue';
import HomeFooter from '@/components/HomeFooter.vue'

export default defineComponent({
    name: 'HomePage',
    components: {
        NavHeader,
        HomeListaSituacoes,
        HomeFooter
    }
})
</script>

<style scoped>

</style>