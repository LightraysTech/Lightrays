<script setup>
</script>

<template>
  <h1>CSS Classes</h1>
  <br>
  <br>
  <h2>Components</h2>
  <p>
    Components styles can be applied to <code>&lt;button&gt;</code>, <code>&lt;input&gt;</code> and elements with <code>class="lr-box"</code>:
  </p>
  <table>
    <tr>
      <td><code>&lt;div class="lr-box"&gt;Div&lt;/div&gt;</code></td>
      <td>
        <div class="lr-box">Div</div>
      </td>
    </tr>
    <tr>
      <td><code>&lt;button&gt;Button&lt;/button&gt;</code></td>
      <td><button>Button</button></td>
    </tr>
    <tr>
      <td><code>&lt;input placeholder="Input"&gt;</code></td>
      <td><input placeholder="Input"></td>
    </tr>
  </table>
  <br>
  <h3>Classes</h3>
  <table>
    <tr>
      <td><code>.flat</code></td>
      <td>
        <div class="lr-box flat">Flat</div>
      </td>
    </tr>
    <tr>
      <td><code>.important</code></td>
      <td>
        <div class="lr-box important">Important</div>
      </td>
    </tr>
    <tr>
      <td><code>.transparent</code></td>
      <td>
        <div class="lr-box transparent">Transparent</div>
      </td>
    </tr>
    <tr>
      <td><code>.inline</code></td>
      <td>
        <div class="lr-box inline">Inline</div>
      </td>
      <td>Default for <code>&lt;button&gt;</code> and <code>&lt;input&gt;</code> elements</td>
    </tr>
    <tr>
      <td><code>.small</code></td>
      <td>
        <div class="lr-box small">Small</div>
      </td>
    </tr>
    <tr>
      <td><code>.inline.small</code></td>
      <td>
        <div class="lr-box small inline">Small Inline</div>
      </td>
    </tr>
    <tr>
      <td><code>.interactive</code></td>
      <td>
        <div class="lr-box interactive">Interactive</div>
      </td>
      <td>Default for <code>&lt;button&gt;</code> and <code>&lt;input type="[button|submit|reset]"&gt;</code> elements</td>
    </tr>
  </table>
  <br>
  <h4>Parent classes</h4>
  <p>The same styles can be applied to all children of a element by adding the class with the <code>-components</code> suffix to its parent.</p>
  <b>Example:</b>
  <pre><code lang="html">&lt;div class="<b>small-components flat-components</b>"&gt;
  &lt;input type="text" placeholder="Input"&gt;
  &lt;button&gt;Button&lt;/button&gt;
&lt;/div&gt;</code></pre>
  <div class="small-components flat-components">
    <input type="text" placeholder="Input">
    <br>
    <button>Button</button>
  </div>
  <br>
  <h4>Nested Components</h4>
  <p>Nested Components have the <code>.flat</code> style applied. This can be overwritten with the <code>.shadow</code> class:</p>
  <div class="lr-box">
    Parent Component
    <br><br>
    <div class="lr-box">Child Component</div><br>
    <div class="lr-box shadow">Child Component with <code>class=".shadow"</code></div>
  </div>

  <br><br>
  <h2>Flexbox</h2>
  <pre><code>.flex
.flex-center
.flex-vertical
.flex-wrap
.flex-grow

.tiny-gap
.small-gap
.gap</code></pre>

<br><br>
  <h2>Dialog</h2>

  <br><br>
  <h2>Navigation</h2>

  <br><br>
  <h2>Lists</h2>

  <br><br>
  <h2>Details</h2>

  <br><br>
  <h2>Code</h2>

  <br><br>
  <h2>Other</h2>
  <pre><code>a.noStyle
.hidden
.round-corners
.very-round-corners</code></pre>

</template>

<style scoped lang='scss'></style>