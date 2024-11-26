<script setup>
</script>

<template>
  <label>Text Input:</label><br>
  <div class="flex-wrap gap">
    <input type="text" placeholder="Input">
    <input type="text" class="flat" placeholder="Flat Input">
  </div>
  <br>
  <div class="flex-wrap gap">
    <input disabled type="text" placeholder="Disabled">
    <input disabled type="text" class="flat" placeholder="Flat Disabled ">
  </div>
  <br><br>
  <input type="search" placeholder="Search">
  <br><br>
  <input type="date">
  <br><br>
  <label for="s">Select:</label><br>
  <select id="s">
    <option value="">Option 1</option>
    <option value="">Option 2</option>
    <option value="">Option 3</option>
  </select>
  <br><br>
  <input type="checkbox" id="cb">
  <label for="cb" class="right">Checkbox</label>
  <br><br>
  <input type="checkbox" id="cbd" disabled>
  <label for="cbd" class="right">Disabled Checkbox</label>
  <br><br>
  <input type="checkbox" class="small" id="cbs">
  <label for="cbs" class="right">Small Checkbox</label>
  <br><br>
  <div class="flex-wrap gap">
    <button>Default</button>
    <button><i class="fluentIcon calendar_regular"></i><span>Default</span></button>
    <button class="important"><i class="fluentIcon calendar_regular"></i><span>Important</span></button>
    <button class="flat"><i class="fluentIcon calendar_regular"></i><span>Flat</span></button>
    <button class="subtle"><i class="fluentIcon calendar_regular"></i><span>Subtle</span></button>
  </div>
  <br>
  <div class="flex-wrap gap">
    <button disabled>Default</button>
    <button disabled><i class="fluentIcon calendar_regular"></i><span>Default</span></button>
    <button disabled class="important"><i class="fluentIcon calendar_regular"></i><span>Important</span></button>
    <button disabled class="flat"><i class="fluentIcon calendar_regular"></i><span>Flat</span></button>
  </div>
  <br>
  <div class="flex-wrap gap small-components">
    <button>Default</button>
    <button><i class="fluentIcon calendar_regular"></i><span>Default</span></button>
    <button class="important"><i class="fluentIcon calendar_regular"></i><span>Important</span></button>
    <button class="flat"><i class="fluentIcon calendar_regular"></i><span>Flat</span></button>
  </div>
</template>

<style scoped lang='scss'></style>