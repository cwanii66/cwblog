<script setup>
useHead({
  meta: [
    { property: 'og:title', content: 'chriswong' },
    { name: 'description', content: 'cw\'s blog world' },
  ]
})
</script>

<template>
  <Header />
  <main class="px-7 py-10">
    <router-view />
    <Footer />
  </main>
</template>

<style scoped>
</style>
