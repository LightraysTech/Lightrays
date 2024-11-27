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
  <br><br>
  <h4>All input types:</h4>
  <br>
  <table>
    <tbody>
      <tr>
        <td><label>Text:</label></td>
        <td><input type="text" value="Hello World!"></td>
      </tr>
      <tr>
        <td><label>Email:</label></td>
        <td><input type="email" value="example@example.com"></td>
      </tr>
      <tr>
        <td><label>Password:</label></td>
        <td><input type="password" value="SecurePassword123!"></td>
      </tr>
      <tr>
        <td><label>Search:</label></td>
        <td><input type="search" value="Search Term"></td>
      </tr>
      <tr>
        <td><label>Number:</label></td>
        <td><input type="number" value="42"></td>
      </tr>
      <tr>
        <td><label>DateTime:</label></td>
        <td><input type="datetime" value="2022-07-25T14:30:00"></td>
      </tr>
      <tr>
        <td><label>Month:</label></td>
        <td><input type="month" value="June"></td>
      </tr>
      <tr>
        <td><label>Week:</label></td>
        <td><input type="week" value="Week 10"></td>
      </tr>
      <tr>
        <td><label>Time:</label></td>
        <td><input type="time" value="14:30"></td>
      </tr>
      <tr>
        <td><label>Tel:</label></td>
        <td><input type="tel" value="(123) 456-7890"></td>
      </tr>
      <tr>
        <td><label>URL:</label></td>
        <td><input type="url" value="https://example.com"></td>
      </tr>
      <tr>
        <td><br></td>
      </tr>
      <tr>
        <td><label>Checkbox:</label></td>
        <td><input type="checkbox" checked value="Check me!"></td>
      </tr>
      <tr>
        <td><label>Radio:</label></td>
        <td><input type="radio" name="option" id="one" value="Option 1" checked></td>
      </tr>
      <tr>
        <td><label>Range:</label></td>
        <td><input type="range" min="0" max="100" step="5" value="50"></td>
      </tr>
      <tr>
        <td><label>File:</label></td>
        <td><input type="file" value="image.jpg"></td>
      </tr>
      <tr>
        <td><label>Hidden:</label></td>
        <td><input type="hidden" value="Hidden Value"></td>
      </tr>
      <tr>
        <td><label>Image:</label></td>
        <td><input type="image" src="/Lightrays/logo.png" height="64" alt="Image Description"></td>
      </tr>
      <tr>
        <td><label>Button:</label></td>
        <td><input type="button" value="Click me!"></td>
      </tr>
      <tr>
        <td><label>Reset:</label></td>
        <td><input type="reset" value="Reset Form"></td>
      </tr>
      <tr>
        <td><label>Submit:</label></td>
        <td><input type="submit" value="Submit Form"></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang='scss'></style>