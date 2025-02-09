<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import router from './router';
import { theme } from './store';

const navOpen = ref(false);
</script>

<template>
  <nav :open="navOpen">
    <a @click="navOpen = false">
      <img src="/logo.png" height="20" style="display: block;filter: hue-rotate(calc(var(--hue) * 1deg - 250deg))">
      <b>Lightrays</b>
    </a>
    <br>
    <RouterLink to="/">
      <i class="fluentIcon home_regular"></i>
      <span>Home</span>
    </RouterLink>
    <RouterLink to="/classes">
      <i class="fluentIcon document_css_regular"></i>
      <span>Classes Reference</span>
    </RouterLink>
    <RouterLink to="/typography">
      <i class="fluentIcon text_font_size_regular"></i>
      Typography
    </RouterLink>
    <RouterLink to="/inputs">
      <i class="fluentIcon text_field_regular"></i>
      Input
    </RouterLink>
    <RouterLink to="/animation">
      <i class="fluentIcon bezier_curve_square_regular"></i>
      Animation
    </RouterLink>
    <RouterLink to="/colors">
      <i class="fluentIcon bezier_curve_square_regular"></i>
      Color
    </RouterLink>
    <label>Label</label>
    <RouterLink to="/experiments">
      <i class="fluentIcon beaker_regular"></i>
      Experiments
    </RouterLink>

    <details>
      <summary>Example Pages</summary>
      <RouterLink to="/examples/list">
        <i class="fluentIcon beaker_regular"></i>
        List
      </RouterLink>
    </details>

    <details>
      <summary>Submenu</summary>
      <a>Page</a>
      <details>
        <summary>Menu</summary>
        <a>Link 1</a>
        <a>Link 2</a>
      </details>
    </details>
    <br>
    <div style="flex-grow: 1;"></div>
    <a href="">
      <i class="fluentIcon settings_regular"></i>
      Settings
    </a>
  </nav>

  <main :theme>
    <header>
      <img class="mobile-header" @click="navOpen = true" src="/logo.png" height="28" style="filter: hue-rotate(calc(var(--hue) * 1deg - 250deg))">
      <h3>{{ router.currentRoute.value.name }}</h3>

      <div class="grow"></div>
      <button v-if="theme == 'light' || theme == 'auto-light'" @click="theme = 'dark'" class="subtle"><i class="fluentIcon weather_moon_regular"></i></button>
      <button v-if="theme == 'dark' || theme == 'auto-dark'" @click="theme = 'light'" class="subtle"><i class="fluentIcon weather_sunny_regular"></i></button>
    </header>
    <article class="p-xl">
      <RouterView />
    </article>
  </main>

</template>

<style scoped>
main {
  padding: 0;
}

header {
  position: sticky;
  top: 0px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 32px;
  border-radius: 0;
  background-color: var(--site-background);
  z-index: 100;
}
</style>
