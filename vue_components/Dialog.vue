<script setup lang="ts">
import { onMounted, useTemplateRef, watchEffect } from 'vue';

const emit = defineEmits(['submit'])
const props = defineProps<{ name: string }>()
const model = defineModel<boolean>({ required: true })
const dialog = useTemplateRef<HTMLDialogElement>("dialog");

onMounted(() => {
  if (model.value) {
    dialog.value?.showModal()
  }
})

watchEffect(() => {
  if (model.value) {
    dialog.value?.showModal()
  } else {
    dialog.value?.close()
  }
})

function modalClickHandler(e: PointerEvent) {
  if (e.pointerId == -1) return
  if (!dialog.value) return

  if (e.target == dialog.value) {
    closeModal()
  }
}

function closeModal() {
  if (!model.value) return
  model.value = false
}
</script>

<template>
  <Transition>
    <dialog v-if="model" ref="dialog" @close="closeModal" @pointerdown="modalClickHandler">
      <form method="dialog" @submit="e => $emit('submit', e)">
        <header class="defaultHeader">
          <h4>{{ name }}</h4>
          <button type="button" class="small subtle" @click="model = false">
            <i class="fluentIcon dismiss_regular"></i>
          </button>
        </header>
        <slot></slot>
      </form>
    </dialog>
  </Transition>
</template>

<style scoped lang='scss'>
i::before {
  content: '\e63f';
}

dialog {
  min-width: min(calc(100dvw - 2rem), 400px);
}

header.defaultHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 16px 20px 12px 24px;
  background-color: var(--color-inset);

  h4 {
    text-overflow: ellipsis;
  }
}
</style>