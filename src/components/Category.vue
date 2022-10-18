<script setup>
defineProps(['categories'])
</script>
<template>
  <template v-for="key in Object.keys(categories)" :key="key">
    <h4 class="font-bold text-5">
      {{ key }}
    </h4>
    <div class="sort-grid py-2 -mx-3 gap-2">
      <router-link
        v-for="(item, idx) in categories[key]"
        class="item relative flex items-center"
        :key="idx"
        :to="item.link"
        :class="!item.link ? 'opacity-0 pointer-events-none h-0 -mt-8 -mb-4' : ''"
        :title="item.name"
      >
        <div v-if="item.icon" class="pt-2 pr-5">
          <Webpack v-if="item.icon === 'webpack'" class="text-4xl opacity-50" />
          <div v-else class="text-3xl opacity-50" :class="item.icon || 'i-carbon-unknown'" />
        </div>
        <div class="flex-auto">
          <div class="text-normal"> {{ item.name }} </div>
          <div class="desc text-sm opacity-50 font-normal" v-html="item.desc" />
        </div>
      </router-link>
    </div>
  </template>
  <div class="markdown pb5 pt-6">
    <h5 class="text-center">
      <em op50> 
        ------------ bottom ------------ 
      </em>
    </h5>
  </div>
</template>

<style scoped>
.sort-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.sort-grid a.item {
  padding: 0.8em 1em;
  background: transparent;
  font-size: 1.1rem;
}

.sort-grid a.item:hover {
  background: #88888808;
}
</style>
