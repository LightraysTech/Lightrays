<script setup lang='ts'>
import { computed, onMounted, ref, useId, useTemplateRef, watch } from "vue";

const props = defineProps<{ class?: any, margin?: number, centerOnMobile?: boolean }>()

const isOpen = defineModel({ default: false })

const id = useId()

const intersectorBR = useTemplateRef<HTMLElement>("intersectorBR")
const intersectorTR = useTemplateRef<HTMLElement>("intersectorTR")
const intersectorBL = useTemplateRef<HTMLElement>("intersectorBL")
const intersectorTL = useTemplateRef<HTMLElement>("intersectorTL")

const picker = useTemplateRef<HTMLElement>("picker")

const btn = useTemplateRef<HTMLElement>("btn")

watch(isOpen, () => {
  if (isOpen.value) {
    picker.value?.showPopover()
    width.value = picker.value?.clientWidth || 0
    height.value = picker.value?.clientHeight || 0
  } else {
    picker.value?.hidePopover()
  }
})

function toggle(e: ToggleEvent) {
  isOpen.value = e.newState == "open"
}

const pickerObserver = new IntersectionObserver(pickerIntersect, {
  threshold: 1
})
const observer = new IntersectionObserver(intersect, {
  threshold: 1
})

onMounted(() => {
  if (picker.value) {
    pickerObserver.observe(picker.value)
  }
  if (intersectorBR.value && intersectorTR.value && intersectorBL.value && intersectorTL.value) {
    observer.observe(intersectorBR.value)
    observer.observe(intersectorTR.value)
    observer.observe(intersectorBL.value)
    observer.observe(intersectorTL.value)
  }
})

const width = ref(0)
const height = ref(0)
function pickerIntersect(entries: IntersectionObserverEntry[]) {
  if (!isOpen.value) return

  width.value = picker.value?.clientWidth || 0
  height.value = picker.value?.clientHeight || 0
}

const positionAreaOptions = ["bottom span-right", "top span-right", "bottom span-left", "top span-left"]

const positionArea = ref(positionAreaOptions[0])

const intersections = [true, true, true, true]

function intersect(entries: IntersectionObserverEntry[]) {
  if (!isOpen.value) return

  for (const entry of entries) {
    switch (entry.target) {
      case intersectorBR.value:
        intersections[0] = entry.isIntersecting
        break;
      case intersectorTR.value:
        intersections[1] = entry.isIntersecting
        break;
      case intersectorBL.value:
        intersections[2] = entry.isIntersecting
        break;
      case intersectorTL.value:
        intersections[3] = entry.isIntersecting
        break;
    }
  }
  for (let i = 0; i < intersections.length; i++) {
    if (intersections[i]) {
      positionArea.value = positionAreaOptions[i]
      break;
    }
  }
}

const pickerStyles = computed(() => `position-anchor: --${id}; --picker-margin: ${props.margin || 8}px;`)
const pickerPlaceholderStyles = computed(() => pickerStyles.value + `; width: ${width.value}px; height: ${height.value}px`)
const pickerClasses = computed(() => ({ 'centerOnMobile': props.centerOnMobile }))
</script>

<template>
  <button ref="btn" :class @click="isOpen = !isOpen" :style="'anchor-name: --' + id">
    <slot></slot>
  </button>
  <div class="picker" :class="pickerClasses" :style="pickerStyles + `position-area:${positionArea}`" @toggle="toggle" popover ref="picker">
    <slot name="picker"></slot>
  </div>
  <div style="position-area: bottom span-right;" class="pickerPlaceholder" :class="pickerClasses" :style="pickerPlaceholderStyles" ref="intersectorBR"></div>
  <div style="position-area: top span-right;" class="pickerPlaceholder" :class="pickerClasses" :style="pickerPlaceholderStyles" ref="intersectorTR"></div>
  <div style="position-area: bottom span-left;" class="pickerPlaceholder" :class="pickerClasses" :style="pickerPlaceholderStyles" ref="intersectorBL"></div>
  <div style="position-area: top span-left;" class="pickerPlaceholder" :class="pickerClasses" :style="pickerPlaceholderStyles" ref="intersectorTL"></div>
</template>

<style scoped>
.pickerPlaceholder {
  margin: var(--picker-margin) 0;
  position: absolute;

  /* background: rgba(255, 0, 0, 0.658); */
  /* outline: 1px solid black; */
}

.picker {
  margin: var(--picker-margin) 0;
  padding: 0;
  position: absolute;
  position-area: bottom span-right;

  transition-property: display, margin, opacity;
  transition-duration: .25s;
  transition-timing-function: var(--easeOutQuart);
  transition-behavior: allow-discrete;
}

@starting-style {
  .picker:not(.centerOnMobile) {
    margin: -8px 0;
    opacity: 0;
  }
}

.picker:not(.centerOnMobile):not(:popover-open) {
  margin: -8px 0;
  opacity: 0;
}

@media screen and (width > 450px) {
  @starting-style {
    .picker {
      margin: -8px 0;
      opacity: 0;
    }
  }

  .picker:not(:popover-open) {
    margin: -8px 0;
    opacity: 0;
  }
}

@media screen and (width < 450px) {
  .centerOnMobile {
    position: fixed;
    position-anchor: initial !important;
    margin: auto;
    max-height: 100dvh;
    max-width: 100dvw;
  }

  @starting-style {
    .picker.centerOnMobile {
      opacity: 0;
    }
  }

  .picker.conterOnMobile:not(:popover-open) {
    opacity: 0;
  }

  .centerOnMobile::backdrop {
    background-color: hsla(0, 0%, 0%, 0.5);
  }
}
</style>