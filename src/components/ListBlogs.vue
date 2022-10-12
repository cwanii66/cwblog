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
    <template v-if="!blogs.length">
      <div py2 op50>
        { nothing here yet... }
      </div>
    </template>

    <template v-for="(route, idx) in blogs" :key="route.path">
      <div v-if="!isSameYear(route.date, blogs[idx - 1]?.date)" relative h20 pointer-events-none>
        <span text-8em op10 absolute left--3rem top--2rem font-bold> {{ getYear(route.date) }} </span>
      </div>
      <app-link
        class="item block font-normal mb-6 mt-2 no-underline"
        :to="route.path"
      >
        <li class="no-underline">
          <div class="title text-lg leading-1.2em">
            <span
              v-if="route.upcoming"
              align-middle
              class="text-xs border rounded px-1 pb-0.2 md:ml--19 mr2 bg-lime/10 border-lime text-lime"
            >upcoming</span>
            <span align-middle> {{ route.title }} </span>
            <span />
          </div>
          <div class="time opacity-50 text-sm">
            {{ formatDate(route.Date) }}
            <span v-if="route.duration" op80>· {{ route.duration }}</span>
            <span v-if="route.platform" op80>· {{ route.platform }}</span>
          </div>
        </li>
      </app-link>
    </template>
  </ul>
</template>
