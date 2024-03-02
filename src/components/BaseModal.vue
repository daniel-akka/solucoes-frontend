<template>
    <div>
        <div class="fixed w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
 
            <slot />
            
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseModal',
    setup () {
        

        return {}
    }
})
</script>

<style scoped>

</style>