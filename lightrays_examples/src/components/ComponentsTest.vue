<script setup lang="ts">
const props = defineProps(['parentClass'])

const styles = ["default", "shadow", "important", "flat", "subtle", "transparent"]

function upperCaseFirst(s: string) {
  return s[0].toUpperCase() + s.substring(1)
}
</script>

<template>
  <div :class="' lr-box'">lr-box</div>
  <br><br>
  <h4>Inputs</h4>
  <div class="flex-vertical gap my-m">
    <small class="subtle-text"><b>Default</b></small>
    <div :class="parentClass + ' flex-wrap my-s gap-m'">
      <input v-for="s in styles" :class="s" :value="upperCaseFirst(s)" style="width: 200px;">
    </div>
    <small class="subtle-text"><b>Disabled</b></small>
    <div :class="parentClass + ' flex-wrap my-s gap-m'">
      <input disabled v-for="s in styles" :class="s" :value="upperCaseFirst(s)" style="width: 200px;">
    </div>
    <small class="subtle-text"><b>Small</b></small>
    <div :class="parentClass + ' flex-wrap my-s gap-m'">
      <input v-for="s in styles" :class="s + ' small'" :value="upperCaseFirst(s)" style="width: 200px;">
    </div>
  </div>
  <br><br>
  <h4>Buttons</h4>
  <div class="flex-vertical gap">
    <div :class="parentClass + ' flex-wrap my-s gap-m'">
      <button v-for="s in styles" :class="s">{{ upperCaseFirst(s) }}</button>
    </div>
    <div :class="parentClass + ' flex-wrap my-s gap-m'">
      <button disabled v-for="s in styles" :class="s">{{ upperCaseFirst(s) }}</button>
    </div>
    <div :class="parentClass + ' flex-wrap my-s gap-m'">
      <button v-for="s in styles" :class="s + ' small'">{{ upperCaseFirst(s) }}</button>
    </div>
  </div>
  <br><br>
  <h5>Selects</h5>
  <div class="flex-vertical gap">
    <div :class="parentClass + ' flex-wrap my-s gap-m'">
      <select v-for="s in styles" :class="s">
        <option value="">{{ upperCaseFirst(s) }}</option>
      </select>
    </div>
    <div :class="parentClass + ' flex-wrap my-s gap-m'">
      <select disabled v-for="s in styles" :class="s">
        <option value="">{{ upperCaseFirst(s) }}</option>
      </select>
    </div>
    <div :class="parentClass + ' flex-wrap my-s gap-m'">
      <select v-for="s in styles" :class="s + ' small'">
        <option value="">{{ upperCaseFirst(s) }}</option>
      </select>
    </div>
  </div>

  <br><br>
  <input type="checkbox" id="cb">
  <label for="cb" class="right">Checkbox</label>
  <br><br>
  <input type="checkbox" id="cbd" disabled>
  <label for="cbd" class="right">Disabled Checkbox</label>
  <br><br>
  <input type="checkbox" class="small" id="cbs">
  <label for="cbs" class="right">Small Checkbox</label>

  <input type="button" value="Input Button">
  <input type="submit" value="Submit">
</template>

<style scoped lang='scss'></style>