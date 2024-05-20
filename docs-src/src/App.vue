<script setup>
import { ref, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import router from './router';

const theme = ref(window.matchMedia("(prefers-color-scheme: dark)").matches ? "auto-dark" : "auto-light");

const navOpen = ref(true);
</script>

<template>
  <nav :open="navOpen">
    <a @click="navOpen = false">
      <img src="/logo.png" height="20" style="display: block;filter: hue-rotate(calc(var(--hue) * 1deg - 230deg))">
      <b>Lightrays</b>
    </a>
    <br>
    <a>
      <i class="fluentIcon home_filled"></i>
      <span>Home</span>
    </a>
    <a>
      <i class="fluentIcon layout_column_two_split_right_filled"></i>
      Layout
    </a>
    <a>
      <i class="fluentIcon text_field_filled"></i>
      Input
    </a>
    <details>
      <summary>Submenu</summary>
      <a>Page</a>
      <details>
        <summary>Menu</summary>
        <a>Link 1</a>
        <a>Link 2</a>
      </details>
    </details>
    <div style="flex-grow: 1;"></div>
    <a href="">
      <i class="fluentIcon settings_filled"></i>
      Settings
    </a>
  </nav>

  <header>
    <img class="mobile-header" @click="navOpen = true" src="/logo.png" height="24" style="filter: hue-rotate(calc(var(--hue) * 1deg - 230deg))">
    <b class="mobile-header">{{ router.currentRoute.value.name }}</b>

    <div style="flex-grow: 1;"></div>
    <button v-if="theme == 'light' || theme == 'auto-light'" @click="theme = 'dark'"><i class="fluentIcon weather_moon_regular"></i></button>
    <button v-if="theme == 'dark' || theme == 'auto-dark'" @click="theme = 'light'"><i class="fluentIcon weather_sunny_regular"></i></button>
  </header>
  <main :theme>
    <RouterView />
  </main>

</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  border-radius: 0;
  border-bottom: var(--site-stroke);
}

@media (width > 1000px) {
  .mobile-header {
    display: none;
  }

  header {
    border: none;
  }
}
</style>
