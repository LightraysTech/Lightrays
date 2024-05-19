<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>

  </header>
  <main>
    <RouterView />
  </main>

</template>

<style scoped>
</style>
