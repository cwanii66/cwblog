<template>
  <header class="head z-40">
    <router-link
      class="w-10 h-10 absolute lg:fixed m-6 select-none outline-none"
      to="/"
      focusable="false"
    >
    <!-- logo -->
      <span v-show="isDark" style="color:ivory;"> CW </span>
      <span v-show="!isDark" style="color:black;"> CW </span>
    </router-link>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <router-link to="/" title="Home">
          <span class="lt-md:hidden">About</span>
          <div i-ic:baseline-home md:hidden />
        </router-link>
        <router-link to="/blogs" title="Blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line md:hidden />
        </router-link>
        <a href="https://twitter.com/cwanii66" target="_blank" title="Twitter">
          <feather-twitter />
        </a>
        <a href="https://github.com/cwanii66" target="_blank" title="Github">
          <div i-uil-github-alt />
        </a>
        <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden">
          <div i-la-rss-square style="font-size:1.25rem; margin: 0 -0.125rem;" />
        </a>
        <ToggleBackcolor />
      </div>

    </nav>
  </header>
</template>

<script setup>
import { isDark } from '~/utils'
</script>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}

</style>
