<script setup lang='ts'>
import { onMounted, onUpdated, ref, useTemplateRef } from 'vue';

defineProps<{ placeholder?: string }>()

const model = defineModel<any>({ default: null })
const select = useTemplateRef<HTMLSelectElement>("select")

const displayValue = ref<string | null>()

onMounted(() => {
  displayValue.value = select.value?.selectedOptions.item(0)?.innerHTML || model.value
})

onUpdated(() => {
  displayValue.value = select.value?.selectedOptions.item(0)?.innerHTML || model.value
})

function click(e: Event) {
  if (e.target != select.value) {
    select.value?.showPicker()
  }
}
</script>

<template>
  <button @click="click">
    <slot name="value">
      <span v-if="model == null && placeholder" class="subtle-text">{{ placeholder }}</span>
      <span v-else-if="model == null">&nbsp;</span>
      <span v-else>{{ displayValue }}</span>
    </slot>
    <i class="fluentIcon chevron_down_regular" size="18"></i>
    <select ref="select" v-model="model">
      <slot></slot>
    </select>
  </button>
</template>

<style scoped>
button {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

button i {
  margin-right: -0px;
  width: 1em;
}

select {
  visibility: hidden;
  padding: 8px;
  position: absolute;
  inset: 0;
}

select > * {
  visibility: visible;
  text-align: initial;
}
</style>