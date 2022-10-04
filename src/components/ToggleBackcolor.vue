<template>
  <a class="select-none" title="toggle backcolor scheme" @click="toggleDark">
    <ri-moon-line v-show="isDark" />
    <ri-sun-line v-show="!isDark" />
  </a>
</template>

<script setup>
import { isDark } from '~/utils'

function toggleDark() {
  isDark.value = !isDark.value
}
</script>