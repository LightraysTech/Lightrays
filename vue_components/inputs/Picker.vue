<script setup lang='ts'>
import { useId } from "vue";
import Dropdown from "../Dropdown.vue";

const props = defineProps<{
  class?: any,
  margin?: number,
  centerOnMobile?: boolean
  positionAreaOptions?: string[]
}>()

const isOpen = defineModel({ default: false })

const id = "--" + useId()
</script>

<template>
  <button :class @click="isOpen = !isOpen" :style="'anchor-name: ' + id">
    <slot></slot>
  </button>
  <Dropdown v-model="isOpen" :anchor-name="id" :margin :center-on-mobile :position-area-options>
    <slot name="picker"></slot>
  </Dropdown>
</template>

<style scoped></style>