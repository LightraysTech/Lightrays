<script setup>
</script>

<template>
  <h1>Lightrays</h1>
  <br>
  <p>
    A modern CSS Web Design including themes, accent colors and animations.
  </p>
  <br><br>
  <h3>Examples</h3>
  <br><br>
  <h4>Component types</h4>
  <br>
  <div class="flex-grow gap">
    <div class="flex-vertical gap">
      <div class="lr-box">Normal</div>
      <div class="lr-box flat">Flat</div>
      <div class="lr-box important">Important</div>
      <div class="lr-box transparent">Transparent</div>
      <div class="lr-box small">Small</div>
      <div class="lr-box inline">Inline</div>
      <div class="lr-box small inline">Small Inline</div>
    </div>
    <div class="flex-vertical gap">
      <div class="interactive lr-box">Normal</div>
      <div class="interactive lr-box flat">Flat</div>
      <div class="interactive lr-box important">Important</div>
      <div class="interactive lr-box transparent">Transparent</div>
      <div class="interactive lr-box small">Small</div>
      <div class="interactive lr-box inline">Inline</div>
      <div class="interactive lr-box small inline">Small Inline</div>
    </div>
  </div>
  <br><br>
  <h4>Colors</h4>
  <div>
    <table>
      <tr>
        <td><label>Hue</label></td>
        <td><input type="range" value="250" onpointermove="document.documentElement.style.setProperty('--hue', event.target.value)" min="0" max="355"></td>
      </tr>
      <tr>
    <td><label>Hue-range</label></td>
    <input type="range" value="6" onpointermove="document.documentElement.style.setProperty('--hue-range', event.target.value)" min="0" max="20">
      </tr>
    </table>
    <br>
    <div class="flex-grow" style="width: min(350px, 100%); border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-3);">
      <div style="height: 120px; background: var(--darkest);"> </div>
      <div style="height: 120px; background: var(--dark);"> </div>
      <div style="height: 120px; background: var(--primary);"> </div>
      <div style="height: 120px; background: var(--light);"> </div>
      <div style="height: 120px; background: var(--lightest);"> </div>
    </div>
    <br>
    <div class="flex-grow" style="width: min(350px, 100%);border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-3);">
      <div style="height: 120px; background: var(--gradient);"> </div>
    </div>

  </div>
  <br><br>
  <h4>Shadows</h4>
  <div class="lr-list gap">
    <div class="flat">Flat</div>
    <div style="box-shadow: none;">No Shadow</div>
    <div style="box-shadow: var(--shadow-0);">Shadow 0</div>
    <div style="box-shadow: var(--shadow-1);">Shadow 1</div>
    <div style="box-shadow: var(--shadow-2);">Shadow 2</div>
    <div style="box-shadow: var(--shadow-3);">Shadow 3</div>
    <div style="box-shadow: var(--shadow-4);">Shadow 4</div>
  </div>
</template>
