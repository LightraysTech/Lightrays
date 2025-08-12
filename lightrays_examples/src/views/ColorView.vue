<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { converter, formatCss, formatHex, type Color, type Oklch } from 'culori';
import Graph from '@/components/Graph.vue';
import { theme } from '@/store';

function round(x: number, precision: number) {
  return Math.round(x * precision) / precision
}

let hsl = converter('hsl');
let hsv = converter('hsv');
let oklch = converter('oklch');


const graph = computed(() => {
  return ([[hsv(lightest_hex.value)?.s, hsv(lightest_hex.value)?.v],
  [hsv(light_hex.value)?.s, hsv(light_hex.value)?.v],
  [hsv(primary_hex.value)?.s, hsv(primary_hex.value)?.v],
  [hsv(dark_hex.value)?.s, hsv(dark_hex.value)?.v],
  [hsv(darkest_hex.value)?.s, hsv(darkest_hex.value)?.v],]);

})
const graph2 = computed(() => {
  return ([[hsl(lightest_hex.value)?.s, hsl(lightest_hex.value)?.l],
  [hsl(light_hex.value)?.s, hsl(light_hex.value)?.l],
  [hsl(primary_hex.value)?.s, hsl(primary_hex.value)?.l],
  [hsl(dark_hex.value)?.s, hsl(dark_hex.value)?.l],
  [hsl(darkest_hex.value)?.s, hsl(darkest_hex.value)?.l],]);
})

const textColorL = ref<Color>({ mode: "hsl", h: 0, s: 0, l: 1 })
const textColorD = ref<Color>({ mode: "hsl", h: 0, s: 0, l: 1 })
const textColor = computed({
  get() {
    return theme.value == 'dark' ? textColorD.value : textColorL.value
  },
  set(v: string) {
    if (theme.value == 'dark') {
      textColorD.value = hsl(v) || textColorD.value
    } else {
      textColorL.value = hsl(v) || textColorL.value
    }
  }
})

type Colors = { lightest: Oklch, light: Oklch, primary: Oklch, dark: Oklch, darkest: Oklch }
const colors = ref<null | {
  l: Colors,
  d: Colors
}>(null)

function reset() {
  const lightest = (window.getComputedStyle(document.body).getPropertyValue("--lightest") as string).replace(/light-dark\(|\)$/g, "").split(", ")
  const light = (window.getComputedStyle(document.body).getPropertyValue("--light") as string).replace(/light-dark\(|\)$/g, "").split(", ")
  const primary = (window.getComputedStyle(document.body).getPropertyValue("--primary") as string).replace(/light-dark\(|\)$/g, "").split(", ")
  const dark = (window.getComputedStyle(document.body).getPropertyValue("--dark") as string).replace(/light-dark\(|\)$/g, "").split(", ")
  const darkest = (window.getComputedStyle(document.body).getPropertyValue("--darkest") as string).replace(/light-dark\(|\)$/g, "").split(", ")

  const textColor = (window.getComputedStyle(document.body).getPropertyValue("--accent-text-color") as string).replace(/light-dark\(|\)$/g, "").split(", ")
  textColorL.value = hsl(textColor[0])||textColorL.value
  textColorD.value = hsl(textColor[1])||textColorD.value


  colors.value = {
    l: {
      lightest: oklch(lightest[0]) || { mode: 'oklch', l: 0, c: 0, h: 0 },
      light: oklch(light[0]) || { mode: 'oklch', l: 0, c: 0, h: 0 },
      primary: oklch(primary[0]) || { mode: 'oklch', l: 0, c: 0, h: 0 },
      dark: oklch(dark[0]) || { mode: 'oklch', l: 0, c: 0, h: 0 },
      darkest: oklch(darkest[0]) || { mode: 'oklch', l: 0, c: 0, h: 0 },
    },
    d: {
      lightest: oklch(lightest[1]) || { mode: 'oklch', l: 0, c: 0, h: 0 },
      light: oklch(light[1]) || { mode: 'oklch', l: 0, c: 0, h: 0 },
      primary: oklch(primary[1]) || { mode: 'oklch', l: 0, c: 0, h: 0 },
      dark: oklch(dark[1]) || { mode: 'oklch', l: 0, c: 0, h: 0 },
      darkest: oklch(darkest[1]) || { mode: 'oklch', l: 0, c: 0, h: 0 },
    }
  }
}
onMounted(reset)

const currentColors = computed(() => {
  return theme.value == 'dark' ? colors.value?.d : colors.value?.l
})

const css = computed({
  get() {
    if (!colors.value) return ""
    const style = (
      `  --lightest: light-dark(${formatCss(colors.value.l.lightest)}, ${formatCss(colors.value.d.lightest)});
  --light: light-dark(${formatCss(colors.value.l.light)}, ${formatCss(colors.value.d.light)});
  --primary: light-dark(${formatCss(colors.value.l.primary)}, ${formatCss(colors.value.d.primary)});
  --dark: light-dark(${formatCss(colors.value.l.dark)}, ${formatCss(colors.value.d.dark)});
  --darkest: light-dark(${formatCss(colors.value.l.darkest)}, ${formatCss(colors.value.d.darkest)});
  --accent-text-color: light-dark(${formatCss(textColorL.value)}, ${formatCss(textColorD.value)});`);
    document.body.setAttribute("style", style)

    return style
  },
  set(v: string) {
    document.body.setAttribute("style", v)
    reset()
  }
})

const lightest_hex = computed({ get() { return formatHex(currentColors.value?.lightest) }, set(v: string) { if (currentColors.value) currentColors.value.lightest = oklch(v) || currentColors.value.lightest } })
const light_hex = computed({ get() { return formatHex(currentColors.value?.light) }, set(v: string) { if (currentColors.value) currentColors.value.light = oklch(v) || currentColors.value.light } })
const primary_hex = computed({ get() { return formatHex(currentColors.value?.primary) }, set(v: string) { if (currentColors.value) currentColors.value.primary = oklch(v) || currentColors.value.primary } })
const dark_hex = computed({ get() { return formatHex(currentColors.value?.dark) }, set(v: string) { if (currentColors.value) currentColors.value.dark = oklch(v) || currentColors.value.dark } })
const darkest_hex = computed({ get() { return formatHex(currentColors.value?.darkest) }, set(v: string) { if (currentColors.value) currentColors.value.darkest = oklch(v) || currentColors.value.darkest } })


const avg_l = computed({
  get() {
    if (!currentColors.value) return null
    return (currentColors.value.lightest.l +
      currentColors.value.light.l +
      currentColors.value.primary.l +
      currentColors.value.dark.l +
      currentColors.value.darkest.l
    ) / 5
  },
  set(v: number) {
    if (avg_l.value != null && currentColors.value != null) {
      const diff = v - avg_l.value

      currentColors.value.lightest.l += diff
      currentColors.value.light.l += diff
      currentColors.value.primary.l += diff
      currentColors.value.dark.l += diff
      currentColors.value.darkest.l += diff
    }
  }
})

const avg_c = computed({
  get() {
    if (!currentColors.value) return null
    return (currentColors.value.lightest.c +
      currentColors.value.light.c +
      currentColors.value.primary.c +
      currentColors.value.dark.c +
      currentColors.value.darkest.c
    ) / 5
  },
  set(v: number) {
    if (avg_c.value != null && currentColors.value != null) {
      const diff = v - avg_c.value

      currentColors.value.lightest.c += diff
      currentColors.value.light.c += diff
      currentColors.value.primary.c += diff
      currentColors.value.dark.c += diff
      currentColors.value.darkest.c += diff
    }
  }
})

const avg_h = computed({
  get() {
    if (!currentColors.value) return null
    return ((currentColors.value.lightest.h || 0) +
      (currentColors.value.light.h || 0) +
      (currentColors.value.primary.h || 0) +
      (currentColors.value.dark.h || 0) +
      (currentColors.value.darkest.h || 0)
    ) / 5
  },
  set(v: number) {
    if (avg_h.value != null && currentColors.value != null) {
      const diff = v - avg_h.value

      currentColors.value.lightest.h = (currentColors.value.lightest.h || 0) + diff
      currentColors.value.light.h = (currentColors.value.light.h || 0) + diff
      currentColors.value.primary.h = (currentColors.value.primary.h || 0) + diff
      currentColors.value.dark.h = (currentColors.value.dark.h || 0) + diff
      currentColors.value.darkest.h = (currentColors.value.darkest.h || 0) + diff
    }
  }
})

const range_l = computed({
  get() {
    if (!currentColors.value) return null
    return Math.max(
      Math.abs(currentColors.value.primary.l - currentColors.value.lightest.l),
      Math.abs(currentColors.value.primary.l - currentColors.value.light.l),
      Math.abs(currentColors.value.primary.l - currentColors.value.primary.l),
      Math.abs(currentColors.value.primary.l - currentColors.value.dark.l),
      Math.abs(currentColors.value.primary.l - currentColors.value.darkest.l)
    )
  },
  set(v: number) {
    if (range_l.value != null && currentColors.value != null) {
      const f = range_l.value == 0 ? 0 : v / range_l.value
      const l = currentColors.value.primary.l

      currentColors.value.lightest.l = l + (currentColors.value.lightest.l - l) * f
      currentColors.value.light.l = l + (currentColors.value.light.l - l) * f
      currentColors.value.dark.l = l + (currentColors.value.dark.l - l) * f
      currentColors.value.darkest.l = l + (currentColors.value.darkest.l - l) * f
    }
  }
})
const range_c = computed({
  get() {
    if (!currentColors.value) return null
    return Math.max(
      Math.abs(currentColors.value.primary.c - currentColors.value.lightest.c),
      Math.abs(currentColors.value.primary.c - currentColors.value.light.c),
      Math.abs(currentColors.value.primary.c - currentColors.value.primary.c),
      Math.abs(currentColors.value.primary.c - currentColors.value.dark.c),
      Math.abs(currentColors.value.primary.c - currentColors.value.darkest.c)
    )
  },
  set(v: number) {
    if (range_c.value != null && currentColors.value != null) {
      const f = range_c.value == 0 ? 0 : v / range_c.value
      const c = currentColors.value.primary.c

      currentColors.value.lightest.c = c + (currentColors.value.lightest.c - c) * f
      currentColors.value.light.c = c + (currentColors.value.light.c - c) * f
      currentColors.value.dark.c = c + (currentColors.value.dark.c - c) * f
      currentColors.value.darkest.c = c + (currentColors.value.darkest.c - c) * f
    }
  }
})
const range_h = computed({
  get() {
    if (!currentColors.value) return null
    return Math.max(
      Math.abs((currentColors.value.primary.h || 0) - (currentColors.value.lightest.h || 0)),
      Math.abs((currentColors.value.primary.h || 0) - (currentColors.value.light.h || 0)),
      Math.abs((currentColors.value.primary.h || 0) - (currentColors.value.primary.h || 0)),
      Math.abs((currentColors.value.primary.h || 0) - (currentColors.value.dark.h || 0)),
      Math.abs((currentColors.value.primary.h || 0) - (currentColors.value.darkest.h || 0))
    )
  },
  set(v: number) {
    if (range_h.value != null && currentColors.value != null) {
      const f = range_h.value == 0 ? 0 : v / range_h.value
      const h = currentColors.value.primary.h || 0

      currentColors.value.lightest.h = h + ((currentColors.value.lightest.h || 0) - h) * f
      currentColors.value.light.h = h + ((currentColors.value.light.h || 0) - h) * f
      currentColors.value.dark.h = h + ((currentColors.value.dark.h || 0) - h) * f
      currentColors.value.darkest.h = h + ((currentColors.value.darkest.h || 0) - h) * f
    }
  }
})

const l5 = computed({ get() { return currentColors.value?.lightest.l }, set(v: number) { if (currentColors.value) currentColors.value.lightest.l = v } })
const l4 = computed({ get() { return currentColors.value?.light.l }, set(v: number) { if (currentColors.value) currentColors.value.light.l = v } })
const l3 = computed({ get() { return currentColors.value?.primary.l }, set(v: number) { if (currentColors.value) currentColors.value.primary.l = v } })
const l2 = computed({ get() { return currentColors.value?.dark.l }, set(v: number) { if (currentColors.value) currentColors.value.dark.l = v } })
const l1 = computed({ get() { return currentColors.value?.darkest.l }, set(v: number) { if (currentColors.value) currentColors.value.darkest.l = v } })

const c5 = computed({ get() { return currentColors.value?.lightest.c }, set(v: number) { if (currentColors.value) currentColors.value.lightest.c = v } })
const c4 = computed({ get() { return currentColors.value?.light.c }, set(v: number) { if (currentColors.value) currentColors.value.light.c = v } })
const c3 = computed({ get() { return currentColors.value?.primary.c }, set(v: number) { if (currentColors.value) currentColors.value.primary.c = v } })
const c2 = computed({ get() { return currentColors.value?.dark.c }, set(v: number) { if (currentColors.value) currentColors.value.dark.c = v } })
const c1 = computed({ get() { return currentColors.value?.darkest.c }, set(v: number) { if (currentColors.value) currentColors.value.darkest.c = v } })

const h5 = computed({ get() { return currentColors.value?.lightest.h }, set(v: number) { if (currentColors.value) currentColors.value.lightest.h = v } })
const h4 = computed({ get() { return currentColors.value?.light.h }, set(v: number) { if (currentColors.value) currentColors.value.light.h = v } })
const h3 = computed({ get() { return currentColors.value?.primary.h }, set(v: number) { if (currentColors.value) currentColors.value.primary.h = v } })
const h2 = computed({ get() { return currentColors.value?.dark.h }, set(v: number) { if (currentColors.value) currentColors.value.dark.h = v } })
const h1 = computed({ get() { return currentColors.value?.darkest.h }, set(v: number) { if (currentColors.value) currentColors.value.darkest.h = v } })

</script>

<template>
  <div :theme></div>
  <textarea style="field-sizing: content;resize: none;" v-model="css"></textarea>
  <br>
  <div class="flex-wrap gap-xl p-l">
    <div>
      <button @click="theme = theme == 'dark' ? 'light' : 'dark'">Toggle Theme</button>
      <div class="flex-wrap gap-l">
        <div>
          <input type="color" v-model="darkest_hex">
          <input type="color" v-model="dark_hex">
          <input type="color" v-model="primary_hex">
          <input type="color" v-model="light_hex">
          <input type="color" v-model="lightest_hex">
          <input type="color" v-model="textColor">
        </div>
        <Graph class="graph" :min-x="-.1" :max-x="1.1" :min-y="-.1" :max-y="1.1" :width="200" :height="200" :data="graph as any"></Graph>
      </div>
      <div class="flex gap-m align-center"><span>l:</span> <input type="range" v-model.number="avg_l" min="0" max="1" step=".01"><input class="small" style="width: 72px;" v-model.number="avg_l"></div>
      <div class="flex gap-m align-center"><span>c:</span> <input type="range" v-model.number="avg_c" min="0" max="1" step=".01"><input class="small" style="width: 72px;" v-model.number="avg_c"></div>
      <div class="flex gap-m align-center"><span>h:</span> <input type="range" v-model.number="avg_h" min="0" max="360" step=".1"><input class="small" style="width: 72px;" v-model.number="avg_h"></div>
      <br>
      <div class="flex gap-m align-center"><span>l_range:</span> <input type="range" v-model.number="range_l" min="0" max="1" step=".01"><input class="small" style="width: 72px;" v-model.number="range_l"></div>
      <div class="flex gap-m align-center"><span>c_range:</span> <input type="range" v-model.number="range_c" min="0" max="1" step=".01"><input class="small" style="width: 72px;" v-model.number="range_c"></div>
      <div class="flex gap-m align-center"><span>h_range:</span> <input type="range" v-model.number="range_h" min="-360" max="360" step=".1"><input class="small" style="width: 72px;" v-model.number="range_h"></div>
      <br>
      <div class="flex gap-m align-center"><span>l1:</span> <input type="range" v-model.number="l1" min="0" max="1" step=".01"><input class="small" style="width: 72px;" v-model.number="l1"></div>
      <div class="flex gap-m align-center"><span>l2:</span> <input type="range" v-model.number="l2" min="0" max="1" step=".01"><input class="small" style="width: 72px;" v-model.number="l2"></div>
      <div class="flex gap-m align-center"><span>l3:</span> <input type="range" v-model.number="l3" min="0" max="1" step=".01"><input class="small" style="width: 72px;" v-model.number="l3"></div>
      <div class="flex gap-m align-center"><span>l4:</span> <input type="range" v-model.number="l4" min="0" max="1" step=".01"><input class="small" style="width: 72px;" v-model.number="l4"></div>
      <div class="flex gap-m align-center"><span>l5:</span> <input type="range" v-model.number="l5" min="0" max="1" step=".01"><input class="small" style="width: 72px;" v-model.number="l5"></div>
      <br>
      <div class="flex gap-m align-center"><span>c1:</span> <input type="range" v-model.number="c1" min="0" max="0.5" step=".01"><input class="small" style="width: 72px;" v-model.number="c1"></div>
      <div class="flex gap-m align-center"><span>c2:</span> <input type="range" v-model.number="c2" min="0" max="0.5" step=".01"><input class="small" style="width: 72px;" v-model.number="c2"></div>
      <div class="flex gap-m align-center"><span>c3:</span> <input type="range" v-model.number="c3" min="0" max="0.5" step=".01"><input class="small" style="width: 72px;" v-model.number="c3"></div>
      <div class="flex gap-m align-center"><span>c4:</span> <input type="range" v-model.number="c4" min="0" max="0.5" step=".01"><input class="small" style="width: 72px;" v-model.number="c4"></div>
      <div class="flex gap-m align-center"><span>c5:</span> <input type="range" v-model.number="c5" min="0" max="0.5" step=".01"><input class="small" style="width: 72px;" v-model.number="c5"></div>
      <br>
      <div class="flex gap-m align-center"><span>h1:</span> <input type="range" v-model.number="h1" min="0" max="360" step=".1"><input class="small" style="width: 72px;" v-model.number="h1"></div>
      <div class="flex gap-m align-center"><span>h2:</span> <input type="range" v-model.number="h2" min="0" max="360" step=".1"><input class="small" style="width: 72px;" v-model.number="h2"></div>
      <div class="flex gap-m align-center"><span>h3:</span> <input type="range" v-model.number="h3" min="0" max="360" step=".1"><input class="small" style="width: 72px;" v-model.number="h3"></div>
      <div class="flex gap-m align-center"><span>h4:</span> <input type="range" v-model.number="h4" min="0" max="360" step=".1"><input class="small" style="width: 72px;" v-model.number="h4"></div>
      <div class="flex gap-m align-center"><span>h5:</span> <input type="range" v-model.number="h5" min="0" max="360" step=".1"><input class="small" style="width: 72px;" v-model.number="h5"></div>
      <br>
    </div>
    <div class="grow">
      <div class="flex-grow" style="width: min(350px, 100%); border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-3);">
        <div style="height: 120px; background: var(--darkest);"> </div>
        <div style="height: 120px; background: var(--dark);"> </div>
        <div style="height: 120px; background: var(--primary);"> </div>
        <div style="height: 120px; background: var(--light);"> </div>
        <div style="height: 120px; background: var(--lightest);"> </div>
      </div>
      <br><br>
      <div class="lr-box">
        <button class="important">Button</button>
        <br><br>
        <button class="important" style="background: linear-gradient(to top left, var(--lightest), var(--darkest));">Button</button>
      </div>

    </div>
  </div>

</template>

<style scoped lang='scss'>
input[type=range] {
  width: 500px;
}

[type=color] {
  width: 96px;
  height: 128px;
}

.graph {
  background: rgb(66, 66, 66);
}
</style>