<script setup>
const props = defineProps({
  to: String
})
const isExternalLink = computed(() => 
  typeof typeof props.to === 'string' && props.to.startsWith('http')
)
</script>
<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link v-else v-bind="$props">
    <slot />
  </router-link>
</template>
