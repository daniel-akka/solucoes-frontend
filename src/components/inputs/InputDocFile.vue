<template>
    <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload de Documentos:</label>
        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"
                accept=".doc, .docx, .txt, .pdf">
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">TXT, DOC, DOX, PDF (MAX. 10MB).</p>
    
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'InputDocFile',
})
</script>

<style scoped>

</style>