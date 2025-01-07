<script setup>
import { onMounted, ref } from 'vue';

const graph1 = ref();

onMounted(()=>{
  /** @type {CanvasRenderingContext2D} */
  const ctx1 = graph1.value.getContext("2d")

let ease =window.getComputedStyle(document.body).getPropertyValue("--curve-ease")
ctx1.setTransform(3,0,0,-3,0,350)

ctx1.beginPath();
ctx1.moveTo(0, 0);
ctx1.bezierCurveTo(...ease.match(/(?<=\().*(?=\))/)[0].split(",").map(x=>Number(x)*100), 100, 100);
ctx1.stroke();


ease = "cubic-bezier(0.45, 0, 0.55, 1);"
ctx1.setTransform(3,0,0,-3,0,350)
ctx1.strokeStyle = "tomato"

ctx1.beginPath();
ctx1.moveTo(0, 0);
ctx1.bezierCurveTo(...ease.match(/(?<=\().*(?=\))/)[0].split(",").map(x=>Number(x)*100), 100, 100);
ctx1.stroke();

ctx1.beginPath();
ctx1.moveTo(0, 0);
ctx1.bezierCurveTo(16,100,30,100, 100, 100);
ctx1.strokeStyle="tomato"
ctx1.stroke();
console.log(ctx1.getTransform());
})
</script>

<template>
<canvas ref="graph1" width="300" height="350"></canvas>
</template>

<style scoped>
</style>