<script setup lang='ts'>
import { iconsFilled, iconsRegular, type IconFilledType, type IconRegularType } from './icons';
import { computed } from 'vue';


const props = defineProps<{
  filled: true;
  t: IconFilledType,
  size?: number,
} | {
  filled?: false;
  t: IconRegularType,
  size?: number,
}>()

const code = computed(() => {
  let code
  if (props.filled) {
    code = iconsFilled[props.t];
  } else {
    code = iconsRegular[props.t]
  }
  if (!code) {
    console.error(`Icon "${props.t}" does not exist.`);
    console.log(props);
    
    code = iconsRegular.error_circle
  }
  return "\\" + code.toString(16)
})

//console.log(new Set(Object.keys(iconsFilled)).difference(new Set(Object.keys(iconsRegular))));
//console.log(new Set(Object.keys(iconsRegular)).difference(new Set(Object.keys(iconsFilled))));

</script>

<template>
  <i class="fluentIcon" :style="`--icon-code: '${code}'; --size: ${size || 20}px`"></i>
</template>

<style scoped lang='scss'>
i::before {
  content: var(--icon-code);
}
</style>