<template>
  <div class="lr-box">
    <slot name="top"></slot>
    <div class="flex gap" style="align-items: center;">
      <slot name="left"></slot>
      <div class="card-main">
        <div class="card-title">
          <slot></slot>
        </div>
        <div class="card-descr">
          <slot name="description"></slot>
        </div>
      </div>
      <slot name="right"></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<style scoped>
div.lr-box {
  border-radius: 8px;
}


:is(.card-left, .card-right, .card-descr):empty {
  display: none;
}

.card-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.card-descr {
  font-size: 0.875em;
  color: var(--subtle-text-color);
}
</style>