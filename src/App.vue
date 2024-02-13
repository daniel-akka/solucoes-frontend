<template>
  <div></div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  created() {
    this.$router.push({name: 'login'})
  }
})
</script>