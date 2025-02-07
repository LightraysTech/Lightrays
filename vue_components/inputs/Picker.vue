<script setup lang='ts'>
import { useId, useTemplateRef, watch } from "vue";

defineProps<{ class?: any, margin?: number, centerOnMobile?: boolean }>()

const isOpen = defineModel({ default: false })

const id = useId()

const picker = useTemplateRef<HTMLElement>("picker")
const btn = useTemplateRef<HTMLElement>("btn")

watch(isOpen, () => {
  if (isOpen.value) {
    const listener = function (e: PointerEvent) {
      if (e.target != btn.value && (picker.value == e.target || !picker.value?.contains(e.target as HTMLElement))) {
        isOpen.value = false

        window.removeEventListener("pointerdown", listener)
      }
    }
    window.addEventListener("pointerdown", listener)
  }
})

</script>

<template>
  <button ref="btn" :class @click="isOpen = !isOpen" :style="'anchor-name: --' + id">
    <slot></slot>
  </button>
  <div :class="['picker', centerOnMobile ? 'centerOnMobile' : '']" :data-open="isOpen" ref="picker" :style="`position-anchor: --${id}; --picker-margin: ${margin || 8}px 0`">
    <slot name="picker"></slot>
  </div>
</template>

<style scoped lang='scss'>
.picker {
  z-index: 1000;
  margin: var(--picker-margin) 0;
  position: absolute;
  position-area: bottom span-right;
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;

  transition-property: display, margin, opacity;
  transition-duration: .25s;
  transition-timing-function: var(--easeOutQuart);
  transition-behavior: allow-discrete;

  &[data-open=false] {
    display: none;
  }

  &:not(.centerOnMobile) {
    @starting-style {
      margin: -8px 0;
      opacity: 0;
    }

    &[data-open=false] {
      margin: -8px 0;
      opacity: 0;
    }
  }

}

@media screen and (width > 450px) {
  .picker {
    @starting-style {
      margin: -8px 0;
      opacity: 0;
    }

    &[data-open=false] {
      margin: -8px 0;
      opacity: 0;
    }
  }
}

@media screen and (width < 450px) {
  .centerOnMobile {
    position: fixed;
    position-anchor: initial !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(0px);
    background-color: hsla(0, 0%, 0%, 0.5);

    @starting-style {
      opacity: 0;
    }

    &[data-open=false] {
      opacity: 0;
    }
  }
}
</style>