<template>
  <div>{{  }}</div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  created() {
    
    const url = window.location.pathname
    if (url.includes('/RecoveryPassword')){
      //this.$router.push('login')
    }else {
      this.$router.push('login')
    }
    
  },
  mounted() {
      console.log()
  },
})
</script>