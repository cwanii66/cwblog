<template>
  <div
    v-if="frontmatter.display ?? frontmatter.title"
    class="prose m-auto mb-8"
  >
    <h1 class="mb-0">
      {{ frontmatter.display ?? frontmatter.title }}
    </h1>
    <p v-if="frontmatter.date" class="opacity-50 !-mt-2">
      {{ formatDate(frontmatter.date) }} <span v-if="frontmatter.duration">· {{ frontmatter.duration }}</span>
    </p>
    <p v-if="frontmatter.subtitle" class="opacity-50 !-mt-6 italic">
      {{ frontmatter.subtitle }}
    </p>
  </div>
  <article ref="content">
    <slot />
  </article>
  <div v-if="route.path !== '/'" class="prose m-auto mt-8">
    <a href=""></a>
    <br>
    <router-link
      to="/"
      class="font-mono no-underline opacity-50 hover:opacity-75"
    >
      返回
    </router-link>
  </div>
</template>

<script setup>
import { formatDate } from '~/utils'

const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})
const router = useRouter()
const route = useRoute()
const content = ref()

const base = 'https://chriswong.vercel.app'


</script>