<script setup>
</script>

<template>
  <h1>Experiments</h1>
  <br>
  <br>
  <h4>Details</h4>
  <br>
  <details>
    <summary class="caret_left">Summary</summary>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore tempore nulla tempora, dolorum adipisci aperiam vel itaque omnis sint inventore at veritatis libero, ipsa repudiandae iste ipsam voluptatem, molestias quam!
    Rerum harum expedita natus laudantium quos repudiandae sunt architecto consequatur est aspernatur inventore totam vero, libero sint corrupti voluptatibus et quasi ipsam voluptates perspiciatis quod magni, explicabo iste voluptatum! Ab!
  </details>
  <details>
    <summary class="caret_right gap" style="align-items: center;"><button>abc</button></summary>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore tempore nulla tempora, dolorum adipisci aperiam vel itaque omnis sint inventore at veritatis libero, ipsa repudiandae iste ipsam voluptatem, molestias quam!
    Rerum harum expedita natus laudantium quos repudiandae sunt architecto consequatur est aspernatur inventore totam vero, libero sint corrupti voluptatibus et quasi ipsam voluptates perspiciatis quod magni, explicabo iste voluptatum! Ab!
  </details>
  <br>

  <h4>Components</h4>
  <div class="flex gap ">
    <input type="text">
    <button><i class="fluentIcon save_regular"></i></button>
    <button>Button</button>
    <select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
  </div>
  <br>
  <div class="flex gap small-components">
    <input type="text">
    <button><i class="fluentIcon save_regular"></i></button>
    <button>Button</button>
    <select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
  </div>
  <br>
  <div class="flat-components">
    <input type="text">
    <button><i class="fluentIcon save_regular"></i></button>
    <button>Button</button>
    <select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
  </div>
  <br><br>
  <button popovertarget="menu1" style="anchor-name: --menu1">Menu</button>
  <menu id="menu1" popover style="position-anchor: --menu1;">
    <button>Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
    <button>Button 4</button>
  </menu>
  <br><br>
  <button popovertarget="menu2" style="anchor-name: --menu2">Menu</button>
  <menu class="small-components" id="menu2" popover style="position-anchor: --menu2;">
    <button>Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
    <button>Button 4</button>
  </menu>
  <br><br>
  <button popovertarget="menu3" style="anchor-name: --menu3">Menu</button>
  <menu id="menu3" popover style="position-anchor: --menu3;">
    <button><i class="fluentIcon add_regular"></i><span>Button 1</span></button>
    <button><i class="fluentIcon save_regular"></i><span>Button 2</span></button>
    <button><i class="fluentIcon delete_regular"></i><span>Button 3</span></button>
  </menu>
  <br><br>
  <button popovertarget="menu4" style="anchor-name: --menu4">Menu</button>
  <menu class="small-components" id="menu4" popover style="position-anchor: --menu4;">
    <button><i class="fluentIcon add_regular"></i><span>Button 1</span></button>
    <button><i class="fluentIcon save_regular"></i><span>Button 2</span></button>
    <button><i class="fluentIcon delete_regular"></i><span>Button 3</span></button>
  </menu>
  <br><br>
  <div class="lr-box">
    <span class="subtle-text">Subtle Text</span>
  </div>
  <div class="lr-box transparent">
    <span class="subtle-text">Subtle Text</span>
  </div>
  <br><br>
  <pre><code lang="javascript">alert("Hello world");</code></pre>
  <p>
    The <code>push()</code> method adds one or more elements to the end of an array and returns the new length of the
    array.
  </p>
</template>

<style scoped lang='scss'></style>