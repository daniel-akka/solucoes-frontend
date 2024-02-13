<template>
    <div>

        <FormCreateAccount />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormCreateAccount from '../components/forms/FormCreateAccount.vue'

export default defineComponent({
    name: 'CreateAccountPage',
    components: {
        FormCreateAccount
    }
})
</script>