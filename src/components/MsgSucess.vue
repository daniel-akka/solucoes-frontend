<template>
    <div class="w-full max-w-sm p-4 centralizar" >
        <a href="#" class="block max-w-sm p-2 bg-emerald-300 bg-opacity-35 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <h5 class="mb-2 text-1x1 text-center font-bold tracking-tight text-emarald-900 dark:text-white">
                {{ mensagem }}
            </h5>

        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MsgAlerta',
    props: {mensagem: String}
})
</script>

<style scoped>
.centralizar{
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>