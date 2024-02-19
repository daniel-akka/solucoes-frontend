<template>
    <div>
    
        <video class="w-96" controls>
            <source src="/docs/videos/flowbite.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InputVideoFile',
})
</script>

<style scoped>

</style>