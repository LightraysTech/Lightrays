<script setup lang='ts'>
import { computed, onMounted, ref, useId, useTemplateRef, watch } from "vue";

const props = defineProps<{
  anchorName:string,
  margin?: number,
  centerOnMobile?: boolean,
  positionAreaOptions?:string[]
}>()

const isOpen = defineModel({ default: false })

const intersectors = useTemplateRef<HTMLElement[]>("intersector")

const dropdown = useTemplateRef<HTMLElement>("dropdown")

watch(isOpen, () => {
  if (isOpen.value) {
    dropdown.value?.showPopover()
    width.value = dropdown.value?.clientWidth || 0
    height.value = dropdown.value?.clientHeight || 0
  } else {
    dropdown.value?.hidePopover()
  }
})

function toggle(e: ToggleEvent) {
  isOpen.value = e.newState == "open"
}

const dropdownObserver = new IntersectionObserver(pickerIntersect, {
  threshold: 1
})
const observer = new IntersectionObserver(intersect, {
  threshold: 1
})

onMounted(() => {
  if (dropdown.value) {
    dropdownObserver.observe(dropdown.value)
  }
  if (intersectors.value) {
    for (const intersector of intersectors.value) {
      observer.observe(intersector)
    }
  }
})

const width = ref(0)
const height = ref(0)
function pickerIntersect(entries: IntersectionObserverEntry[]) {
  if (!isOpen.value) return

  width.value = dropdown.value?.clientWidth || 0
  height.value = dropdown.value?.clientHeight || 0
}

const defaultPositionAreaOptions = ["bottom span-right", "top span-right", "bottom span-left", "top span-left"]
const posAreaOptions = computed(()=>(props.positionAreaOptions||defaultPositionAreaOptions))

const positionArea = ref(posAreaOptions.value[0])

const intersections = new Array<boolean>(posAreaOptions.value.length).fill(true)

function intersect(entries: IntersectionObserverEntry[]) {
  if (!isOpen.value) return
  if (!intersectors.value) return

  for (const entry of entries) {
    for (let i = 0; i < intersectors.value.length; i++) {
      if (entry.target == intersectors.value[i]) {
        intersections[i] = entry.isIntersecting
        break
      }
    }
  }
  for (let i = 0; i < intersections.length; i++) {
    if (intersections[i]) {
      positionArea.value = posAreaOptions.value[i]
      break;
    }
  }
}

const pickerStyles = computed(() => `position-anchor: ${props.anchorName}; --picker-margin: ${props.margin || 8}px;`)
const pickerPlaceholderStyles = computed(() => pickerStyles.value + `; width: ${width.value}px; height: ${height.value}px`)
const pickerClasses = computed(() => ({ 'centerOnMobile': props.centerOnMobile }))
</script>

<template>
  <div class="picker" :class="pickerClasses" :style="pickerStyles + `position-area: ${positionArea}`" @toggle="toggle" popover ref="dropdown">
    <slot></slot>
  </div>
  <div v-for="p in posAreaOptions" class="intersector" :class="pickerClasses" :style="pickerPlaceholderStyles + `;position-area: ${p}`" ref="intersector"></div>
</template>

<style scoped>
.intersector {
  margin: var(--picker-margin) 0;
  position: absolute;
  pointer-events: none;

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
  .picker.centerOnMobile {
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

  .picker.centerOnMobile:not(:popover-open) {
    opacity: 0;
  }

  .picker.centerOnMobile::backdrop {
    background-color: hsla(0, 0%, 0%, 0.5);
  }
}
</style>