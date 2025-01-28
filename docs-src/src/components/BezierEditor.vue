<script setup>
import { onMounted, ref, useModel, watch, watchEffect } from 'vue';


const props = defineProps({
  points: { default: [] },
  width: {
    type: Number,
    default: 600
  },
  height: {
    type: Number,
    default: 300
  }
})

const canvas = ref(null);

const p0 = defineModel("p0", { default: { x: 0, y: 0 } })
const p1 = defineModel("p1", { default: { x: 1, y: 0 } })
const cp0 = defineModel("cp0", { default: { x: .25, y: 1 } })
const cp1 = defineModel("cp1", { default: { x: .75, y: 1 } })

let padding = 20
let x0
let y0
let x1
let y1
let w
let h

function f(p) {
  return { x: p.x * w + x0, y: (1 - p.y) * h + y0 }
}

onMounted(redraw)

function redraw() {
  console.log("a");
  if (!canvas.value) return


  /** @type {CanvasRenderingContext2D} */
  let ctx = canvas.value.getContext("2d")
  x0 = padding
  y0 = padding
  x1 = canvas.value.width - padding
  y1 = canvas.value.height - padding
  w = canvas.value.width - 2 * padding
  h = canvas.value.height - 2 * padding


  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  ctx.beginPath()
  ctx.strokeStyle = "hsl(250, 5%, 30%)"
  ctx.lineWidth = 3
  ctx.moveTo(f(p0.value).x, f(p0.value).y)
  ctx.lineTo(f(cp0.value).x, f(cp0.value).y)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(f(p1.value).x, f(p1.value).y)
  ctx.lineTo(f(cp1.value).x, f(cp1.value).y)
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = "#c04b52"
  ctx.lineCap = "round"
  ctx.lineWidth = 4
  ctx.moveTo(f(p0.value).x, f(p0.value).y)
  // ctx.bezierCurveTo()
  ctx.bezierCurveTo(f(cp0.value).x, f(cp0.value).y, f(cp1.value).x, f(cp1.value).y, f(p1.value).x, f(p1.value).y);
  ctx.stroke()



  ctx.fillStyle = "gray"
  ctx.beginPath()
  ctx.ellipse(f(p0.value).x, f(p0.value).y, 10, 10, 0, 0, 360)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(f(p1.value).x, f(p1.value).y, 10, 10, 0, 0, 360)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(f(cp1.value).x, f(cp1.value).y, 10, 10, 0, 0, 360)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(f(cp0.value).x, f(cp0.value).y, 10, 10, 0, 0, 360)
  ctx.fill()

  for (const p of props.points) {    
    ctx.beginPath()
    ctx.ellipse(f(p).x, f(p).y, 5, 5, 0, 0, 360)
    ctx.fill()
  }
}

function dst(a, b) {
  return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2))
}

const isPtrDown = ref(false);
const moveP = ref(null)
const canMoveX = ref(false)
function ptrDown(e) {
  isPtrDown.value = true
  window.addEventListener("pointerup", () => { isPtrDown.value = false; moveP.value = null }, { once: true })

  if (dst({ x: e.offsetX, y: e.offsetY }, f(p0.value)) < 10) {
    moveP.value = p0.value
    canMoveX.value = false
  } else if (dst({ x: e.offsetX, y: e.offsetY }, f(p1.value)) < 10) {
    moveP.value = p1.value
    canMoveX.value = false
  } else if (dst({ x: e.offsetX, y: e.offsetY }, f(cp0.value)) < 10) {
    moveP.value = cp0.value
    canMoveX.value = true
  } else if (dst({ x: e.offsetX, y: e.offsetY }, f(cp1.value)) < 10) {
    moveP.value = cp1.value
    canMoveX.value = true
  }
}

function ptrMove(e) {
  if (isPtrDown.value && moveP.value) {
    if (canMoveX.value) {
      moveP.value.x = Math.max(0, Math.min(1, (e.offsetX - padding) / w))
    }
    moveP.value.y = Math.max(0, Math.min(1, 1 - (e.offsetY - padding) / h))
    redraw()
  }
}
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height" @pointerdown="ptrDown" @pointermove="ptrMove"></canvas>

</template>

<style scoped>
canvas {
  border: var(--site-stroke);
  border-radius: 4px;
}
</style>