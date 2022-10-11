<script setup>
import { formatDate } from '~/utils'

const props = defineProps(['type', 'blogs'])
const router = useRouter()
const routes = router.getRoutes()
  .filter(r => r.path.startsWith('/blogs') && r.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .filter(r => !r.path.endsWith('.html') && r.meta.frontmatter.type === props.type)
  .map(r => ({
    path: r.path,
    title: r.meta.frontmatter.title,
    date: r.meta.frontmatter.date,
    lang: r.meta.frontmatter.lang,
    recording: r.meta.frontmatter.recording,
    duration: r.meta.frontmatter.duration,
  }))

const blogs = computed(() => (props.blogs || routes))

const getYear = a => new Date(a).getFullYear()
const isSameYear = (a, b) => a && b && getYear(a) === getYear(b)
</script>

<template>
  <ul>
    <template>
      <div py2 op50>
        { nothing here yet... }
      </div>
    </template>

    <template>
      <div>
        <span text-8em op10 absolute left--3rem top--2rem font-bold></span>
      </div>
    </template>
  </ul>
</template>