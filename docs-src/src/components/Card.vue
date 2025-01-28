<template>
  <div class="lr-box">
    <div class="card-left">
      <slot name="left"></slot>
    </div>
    <div class="card-main">
      <div class="card-title">
        <slot></slot>
      </div>
      <div class="card-descr">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="card-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped>
div.lr-box {
  display: flex;
  align-items: center;
  gap: 16px;
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
}

.card-descr {
  font-size: 0.875em;
  color: var(--subtle-text-color);
}
</style>