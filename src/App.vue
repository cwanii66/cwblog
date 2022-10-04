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
  <router-view></router-view>
</template>

<style scoped>
</style>
