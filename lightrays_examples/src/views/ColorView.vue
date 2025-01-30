<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const primary = ref("#0f74c5");

const l = ref(.55);
const c = ref(.15);
const h = ref(250);

const lRange = ref(.2);
const cRange = ref(.03);
const hRange = ref(6);

const l_fac1 = ref(-1);
const l_fac2 = ref(-.5);
const l_fac3 = ref(.5);
const l_fac4 = ref(1);

const c_fac1 = ref(-1);
const c_fac2 = ref(-.5);
const c_fac3 = ref(.5);
const c_fac4 = ref(1);

const h_fac1 = ref(-1);
const h_fac2 = ref(-.5);
const h_fac3 = ref(.5);
const h_fac4 = ref(1);

const l1 = ref()
const l2 = ref()
const l3 = ref()
const l4 = ref()
const c1 = ref()
const c2 = ref()
const c3 = ref()
const c4 = ref()
const h1 = ref()
const h2 = ref()
const h3 = ref()
const h4 = ref()

watchEffect(() => {
  l1.value = l.value + l_fac1.value * lRange.value
  l2.value = l.value + l_fac2.value * lRange.value
  l3.value = l.value + l_fac3.value * lRange.value
  l4.value = l.value + l_fac4.value * lRange.value

  c1.value = c.value + c_fac1.value * cRange.value
  c2.value = c.value + c_fac2.value * cRange.value
  c3.value = c.value + c_fac3.value * cRange.value
  c4.value = c.value + c_fac4.value * cRange.value

  h1.value = h.value + h_fac1.value * hRange.value
  h2.value = h.value + h_fac2.value * hRange.value
  h3.value = h.value + h_fac3.value * hRange.value
  h4.value = h.value + h_fac4.value * hRange.value

  document.documentElement.style.setProperty("--primary", `oklch(${l.value} ${c.value} ${h.value})`)

  document.documentElement.style.setProperty("--l-range", String(lRange.value));
  document.documentElement.style.setProperty("--c-range", String(cRange.value));
  document.documentElement.style.setProperty("--h-range", String(hRange.value));

  document.documentElement.style.setProperty("--l-fac-darkest", String(l_fac1.value));
  document.documentElement.style.setProperty("--l-fac-dark", String(l_fac2.value));
  document.documentElement.style.setProperty("--l-fac-light", String(l_fac3.value));
  document.documentElement.style.setProperty("--l-fac-lightest", String(l_fac4.value));

  document.documentElement.style.setProperty("--c-fac-darkest", String(c_fac1.value));
  document.documentElement.style.setProperty("--c-fac-dark", String(c_fac2.value));
  document.documentElement.style.setProperty("--c-fac-light", String(c_fac3.value));
  document.documentElement.style.setProperty("--c-fac-lightest", String(c_fac4.value));

  document.documentElement.style.setProperty("--h-fac-darkest", String(h_fac1.value));
  document.documentElement.style.setProperty("--h-fac-dark", String(h_fac2.value));
  document.documentElement.style.setProperty("--h-fac-light", String(h_fac3.value));
  document.documentElement.style.setProperty("--h-fac-lightest", String(h_fac4.value));


  /*   document.body.style.setProperty("--darkest", `oklch(${l1.value} ${c1.value} ${h1.value})`)
    document.body.style.setProperty("--dark", `oklch(${l2.value} ${c2.value} ${h2.value})`)
    document.body.style.setProperty("--primary", `oklch(${l.value} ${c.value} ${h.value})`)
    document.body.style.setProperty("--light", `oklch(${l3.value} ${c3.value} ${h3.value})`)
    document.body.style.setProperty("--lightest", `oklch(${l4.value} ${c4.value} ${h4.value})`)
   */
})

function round(x: number, precision: number) {
  return Math.round(x * precision) / precision
}
</script>

<template>
  l: <input type="range" v-model.number="l" min="0" max="1" step=".01">{{ l }}<br>
  c: <input type="range" v-model.number="c" min="0" max="1" step=".01">{{ c }}<br>
  h: <input type="range" v-model.number="h" min="0" max="360" step=".1">{{ h }}<br>
  <br>
  l-range: <input type="range" v-model.number="lRange" min="0" max=".5" step=".01">{{ lRange }}<br>
  c-range: <input type="range" v-model.number="cRange" min="0" max=".1" step=".01">{{ cRange }}<br>
  h-range: <input type="range" v-model.number="hRange" min="-100" max="100" step=".1">{{ hRange }}<br>
  <br>
  l_fac1: <input type="range" v-model.number="l_fac1" min="-1" max="1" step=".01">{{ l_fac1 }}<br>
  l_fac2: <input type="range" v-model.number="l_fac2" min="-1" max="1" step=".01">{{ l_fac2 }}<br>
  l_fac3: <input type="range" v-model.number="l_fac3" min="-1" max="1" step=".01">{{ l_fac3 }}<br>
  l_fac4: <input type="range" v-model.number="l_fac4" min="-1" max="1" step=".01">{{ l_fac4 }}<br>
  <br>
  c_fac1: <input type="range" v-model.number="c_fac1" min="-1" max="1" step=".01">{{ c_fac1 }}<br>
  c_fac2: <input type="range" v-model.number="c_fac2" min="-1" max="1" step=".01">{{ c_fac2 }}<br>
  c_fac3: <input type="range" v-model.number="c_fac3" min="-1" max="1" step=".01">{{ c_fac3 }}<br>
  c_fac4: <input type="range" v-model.number="c_fac4" min="-1" max="1" step=".01">{{ c_fac4 }}<br>
  <br>
  h_fac1: <input type="range" v-model.number="h_fac1" min="-1" max="1" step=".01">{{ h_fac1 }}<br>
  h_fac2: <input type="range" v-model.number="h_fac2" min="-1" max="1" step=".01">{{ h_fac2 }}<br>
  h_fac3: <input type="range" v-model.number="h_fac3" min="-1" max="1" step=".01">{{ h_fac3 }}<br>
  h_fac4: <input type="range" v-model.number="h_fac4" min="-1" max="1" step=".01">{{ h_fac4 }}<br>
  <div class="flex-grow" style="width: min(350px, 100%); border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-3);">
    <div style="height: 120px; background: var(--darkest);"> </div>
    <div style="height: 120px; background: var(--dark);"> </div>
    <div style="height: 120px; background: var(--primary);"> </div>
    <div style="height: 120px; background: var(--light);"> </div>
    <div style="height: 120px; background: var(--lightest);"> </div>
  </div>
  <div class="flex-grow" style="width: min(350px, 100%); border-radius: 8px; box-shadow: var(--shadow-3);">
    <div>
      {{ round(l1, 100) }} <br>
      {{ round(c1, 100) }} <br>
      {{ round(h1, 100) }} <br>
    </div>
    <div>
      {{ round(l2, 100) }} <br>
      {{ round(c2, 100) }} <br>
      {{ round(h2, 100) }} <br>
    </div>
    <div>
      {{ round(l, 100) }} <br>
      {{ round(c, 100) }} <br>
      {{ round(h, 100) }} <br>
    </div>
    <div>
      {{ round(l3, 100) }} <br>
      {{ round(c3, 100) }} <br>
      {{ round(h3, 100) }} <br>
    </div>
    <div>
      {{ round(l4, 100) }} <br>
      {{ round(c4, 100) }} <br>
      {{ round(h4, 100) }} <br>
    </div>
  </div>

</template>

<style scoped lang='scss'>
input[type=range] {
  width: 500px;
}
</style>