<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import router from './router';
import { theme } from './store';
import { startDrag } from 'lightrays/vue_components';

const navOpen = ref(false);
const navStyle = ref("");

const navDragX = ref(0)
const I = ref(0)
/* 
let startCheck = false
window.addEventListener("pointerdown", e => {
  startCheck = false
  startDrag(e, "touch", (dx) => {
    console.log(dx);

    if (navOpen.value && dx < -50) {
      navOpen.value = false;
    }
    if (!navOpen.value && dx > 50) {
      navOpen.value = true;
    }
    navStyle.value = navOpen.value ? `transform: translateX(0 0)` : `transform: translateX(-110%)`
  }, (dx, dy, vx, vy, t, i) => {
    I.value = dx
    if (t > 150 && !startCheck) {
      if (i == 0 || (Math.abs(dy) > Math.abs(dx)) || (navOpen.value && dx > 10) || (!navOpen.value && dx < 20)) {
        navStyle.value = navOpen.value ? `transform: translateX(0 0)` : `transform: translateX(-110%)`
        return true // cancel Drag
      }
      startCheck = true
    }

    if (navOpen.value) {
      navStyle.value = `transition:none; transform: translateX(min(0%, ${dx}px));`
    } else {
      navStyle.value = `transition:none; transform: translateX(min(0%, calc(-100% + ${dx}px)));`
    }
  })
}) */
</script>

<template>
  <nav :open="navOpen || navDragX != 0" :style="navStyle">
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
  background-color: var(--color-base);
  z-index: 100;
}
</style>
