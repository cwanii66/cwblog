<template>
  <div class="prose m-auto mb-8 select-none">
    <div mb-0 flex="~ gap2 sm-gap3 wrap" text-xl sm:text-3xl>
      <router-link
        to="/blogs" 
        class="!border-none !font-400" 
        :class="route.path === '/blogs' ? '' : inactiveStyle"
      >
        Blog
      </router-link>
      <router-link 
        to="/blogs/sort"
        class="!border-none !font-400 p-l-10" 
        :class="route.path === '/plays' ? '' : inactiveStyle"
      >
        Category
      </router-link>
    </div>
  </div>
</template>

<script setup>
const inactiveStyle = 'opacity-20 hover:opacity-50'
const route = useRoute()
</script>
