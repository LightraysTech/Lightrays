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
  <h5>Inputs</h5>
  <div class="flex-vertical gap">
    <div :class="parentClass + ' flex-wrap small-gap'">
      <input v-for="s in styles" :class="s" :value="upperCaseFirst(s)" style="width: 200px;">
    </div>
    <div :class="parentClass + ' flex-wrap small-gap'">
      <input disabled v-for="s in styles" :class="s" :value="upperCaseFirst(s)" style="width: 200px;">
    </div>
    <div :class="parentClass + ' flex-wrap small-gap'">
      <input v-for="s in styles" :class="s + ' small'" :value="upperCaseFirst(s)" style="width: 200px;">
    </div>
  </div>
  <br><br>
  <h5>Buttons</h5>
  <div class="flex-vertical gap">
    <div :class="parentClass + ' flex-wrap small-gap'">
      <button v-for="s in styles" :class="s">{{ upperCaseFirst(s) }}</button>
    </div>
    <div :class="parentClass + ' flex-wrap small-gap'">
      <button disabled v-for="s in styles" :class="s">{{ upperCaseFirst(s) }}</button>
    </div>
    <div :class="parentClass + ' flex-wrap small-gap'">
      <button v-for="s in styles" :class="s + ' small'">{{ upperCaseFirst(s) }}</button>
    </div>
  </div>
  <br><br>
  <h5>Selects</h5>
  <div class="flex-vertical gap">
    <div :class="parentClass + ' flex-wrap small-gap'">
      <select v-for="s in styles" :class="s">
        <option value="">{{ upperCaseFirst(s) }}</option>
      </select>
    </div>
    <div :class="parentClass + ' flex-wrap small-gap'">
      <select disabled v-for="s in styles" :class="s">
        <option value="">{{ upperCaseFirst(s) }}</option>
      </select>
    </div>
    <div :class="parentClass + ' flex-wrap small-gap'">
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