<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watchEffect } from 'vue';

const props = defineProps<{
  width: number,
  height: number,
  data: number[][],
  minX: number | null,
  maxX: number | null,
  minY: number | null,
  maxY: number | null,
}>()

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

watchEffect(() => {
  if (!canvas.value) {
    console.error("Canvas ref not assigned");
    return
  }

  let ctx = canvas.value.getContext("2d")
  if (!ctx) return
  ctx.reset()
  let minX = props.minX != null ? props.minX : Math.min(...props.data.map(d => d[0]))
  let maxX = props.maxX != null ? props.maxX : Math.max(...props.data.map(d => d[0]))
  let minY = props.minY != null ? props.minY : Math.min(...props.data.map(d => d[1]))
  let maxY = props.maxY != null ? props.maxY : Math.max(...props.data.map(d => d[1]))

  let rangeX = maxX - minX
  let rangeY = maxY - minY

  let w = canvas.value.width
  let h = canvas.value.height
  console.log(minX, maxX, minY, maxY);

  ctx.moveTo((props.data[0][0] - minX) * (w / rangeX), h - (props.data[0][1] - minY) * (h / rangeY))
  for (let i = 1; i < props.data.length; i++) {
    ctx.lineTo((props.data[i][0] - minX) * (w / rangeX), h - (props.data[i][1] - minY) * (h / rangeY))
  }
  ctx.strokeStyle = "hsl(0, 0%, 95%)"
  ctx.stroke()
})
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<style scoped>
canvas {
  border: var(--site-stroke);
  border-radius: 4px;
}
</style>