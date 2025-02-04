<script setup lang="ts">
import { Picker, Select, Dialog } from 'lightrays/vue_components';
import { ref } from 'vue';
// import Graph from '@/components/Gaph.vue';
const m = ref(1)
</script>

<template>
  <Dialog name="Title">
    <article>
      Hello
    </article>
    <footer>
      <button type="submit">
        Save
      </button>
    </footer>
  </Dialog>
  <Select v-model="m" placeholder="Select Something">
    <option value="1">Abc</option>
    <option value="2">Def</option>
  </Select>
  <br>
  <Select v-model="m">
    <option :value="null">Null</option>
    <option value="1">Abc</option>
    <option value="2">Def</option>
    <template #value>sdfghj</template>
  </Select>
  <br>
  <select v-model="m">
    <option value="1">Abc</option>
    <option value="2">Def</option>
  </select>
  <br><br>
  <Picker class="flat" :center-on-mobile="true" :margin="8">
    <template #default>asdfrtgzhujiki</template>
    <template #picker>
      <menu style="margin: 0;" class="small-components">
        <button>sdfghjure</button>
        <button>Btn1</button>
        <hr>
        <button>Btn1</button>
      </menu>
    </template>
  </Picker>
  <Picker>
    <template #default>H2a</template>
    <template #picker>
      <menu style="margin: 0;">
        <button>Btn2</button>
      </menu>
    </template>
  </Picker>
  <br>
  <br>
  <button class="mx-m">
    <i class="fluentIcon calendar_regular"></i>
    <span>Calendar</span>
  </button>
  <button class="mx-m">
    <span>Calendar</span>
    <i class="fluentIcon calendar_regular"></i>
  </button>
  <button class="mx-m">
    <span>Cal</span>
    <i class="fluentIcon calendar_regular"></i>
  </button>
  <button class="mx-m">
    <i class="fluentIcon calendar_regular"></i>
  </button>
  <br>
  <br>
  <div>
    Lorem ipsum dolor sit amet <i class="fluentIcon calendar_regular"></i><br>
    Lorem ipsum dolor sit amet <i class="fluentIcon calendar_regular" size="16"></i><br>
    Lorem ipsum dolor sit amet <i class="fluentIcon calendar_regular" size="24"></i><br>
    Lorem ipsum dolor sit amet <i class="fluentIcon calendar_regular" style="--size: 32px"></i><br>
  </div>

  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  <div class="flex-grow" style="width: min(450px, 100%); border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-3);">
    <div style="height: 120px; background: var(--component-important);"> </div>
    <div style="height: 120px; background: var(--site-background);"> </div>
    <div style="height: 120px; background: var(--component-disabled);"> </div>
    <div style="height: 120px; background: var(--component-background);"> </div>
    <div style="height: 120px; background: var(--component-hover);"> </div>
    <div style="height: 120px; background: var(--component-active);"> </div>
    <div style="height: 120px; background: var(--subtle-text-color);"> </div>
    <div style="height: 120px; background: var(--text-color);"> </div>
  </div>
  <h1>Experiments</h1>
  <br>
  <br>
  <h4>Details</h4>
  <br>
  <details>
    <summary class="caret_left">Summary</summary>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore tempore nulla tempora, dolorum adipisci aperiam vel
    itaque omnis sint inventore at veritatis libero, ipsa repudiandae iste ipsam voluptatem, molestias quam!
    Rerum harum expedita natus laudantium quos repudiandae sunt architecto consequatur est aspernatur inventore totam
    vero, libero sint corrupti voluptatibus et quasi ipsam voluptates perspiciatis quod magni, explicabo iste
    voluptatum! Ab!
  </details>
  <details>
    <summary class="caret_right gap" style="align-items: center;"><button>abc</button></summary>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore tempore nulla tempora, dolorum adipisci aperiam vel
    itaque omnis sint inventore at veritatis libero, ipsa repudiandae iste ipsam voluptatem, molestias quam!
    Rerum harum expedita natus laudantium quos repudiandae sunt architecto consequatur est aspernatur inventore totam
    vero, libero sint corrupti voluptatibus et quasi ipsam voluptates perspiciatis quod magni, explicabo iste
    voluptatum! Ab!
  </details>
  <br>

  <div class="flex gap">
    <button>Button</button>
    <button disabled>Button</button>
    <button style="background-color: var(--component-hover);">Button</button>
    <button style="background-color: var(--component-active);">Button</button>
    <button style="background-color: var(--component-important);">Button</button>
  </div>


  <h4>Components</h4>
  <div class="shadow-components">
    abc
    <div class="lr-box flat">
      abc
    </div>
    <div class="lr-box shadow">
      abc
    </div>
  </div>
  <br>
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
    <hr>
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

  <div class="lr-box flex-center gap" style="width: 360px;">
    <img style="border-radius: 4px;" height="44px" src="https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/app_logo.svg" alt="App Name Document">
    <div class="flex-vertical">
      <b>App Name</b>
      <small class="subtle-text">Developer</small>
    </div>
    <button class="shadow subtle" style="margin-left: auto;">
      <i class="fluentIcon more_horizontal_regular"></i>
    </button>
  </div>
  <!--   <h4>Chroma</h4>
  <div class="flex">
    <Graph :data="[
      [0, 0.013],
      [1, 0.026],
      [2, 0.058],
      [3, 0.111],
      [4, 0.16],
      [5, 0.169],
      [6, 0.158],
      [7, 0.134],
      [8, 0.11],
      [9, 0.09],
      [10, 0.066],

    ]"></Graph>

    <Graph :data="[
      [0, 0.026],
      [1, 0.071],
      [2, 0.129],
      [3, 0.182],
      [4, 0.199],
      [5, 0.184],
      [6, 0.162],
      [7, 0.135],
      [8, 0.114],
      [9, 0.095],
      [10, 0.066]
    ]"></Graph>

  </div>


  <h4>Lightness</h4>
  <Graph :data="[
    [0, 0.971],
    [1, 0.936],
    [2, 0.885],
    [3, 0.808],
    [4, 0.704],
    [5, 0.637],
    [6, 0.577],
    [7, 0.505],
    [8, 0.444],
    [9, 0.396],
    [10, 0.258]
  ]"></Graph>

  <Graph :data="[
    [0, 0.987],
    [1, 0.973],
    [2, 0.945],
    [3, 0.905],
    [4, 0.852],
    [5, 0.795],
    [6, 0.681],
    [7, 0.554],
    [8, 0.476],
    [9, 0.421],
    [10, 0.286]
  ]"></Graph>

  <h4>Hue</h4>

  <Graph :data="[
    [0, 17.380],
    [1, 17.717],
    [2, 18.334],
    [3, 19.571],
    [4, 22.216],
    [5, 25.331],
    [6, 27.325],
    [7, 27.518],
    [8, 26.899],
    [9, 25.723],
    [10, 26.042]
  ]"></Graph>

  <Graph :data="[
    [0, 102.21],
    [1, 103.19],
    [2, 101.54],
    [3, 98.111],
    [4, 91.936],
    [5, 86.047],
    [6, 75.834],
    [7, 66.442],
    [8, 61.907],
    [9, 57.708],
    [10, 53.813]
  ]"></Graph>
 -->

  <div class="grid grid-cols-1 gap-2">
    0,977
    0,951
    0,901
    0,828
    0,746
    0,685
    0,588
    0,5
    0,443
    0,391
    0,293

    0,013
    0,026
    0,058
    0,111
    0,16
    0,169
    0,158
    0,134
    0,11
    0,09
    0,066

    236,62
    236,824
    230,902
    230,318
    232,661
    237,323
    241,966
    242,749
    240,79
    240,876
    243,157
  </div>

  <div class="grid grid-cols-1 gap-2">
    0,971 0,013 17,38
    0,936 0,032 17,717
    0,885 0,062 18,334
    0,808 0,114 19,571
    0,704 0,191 22,216
    0,637 0,237 25,331
    0,577 0,245 27,325
    0,505 0,213 27,518
    0,444 0,177 26,899
    0,396 0,141 25,723
    0,258 0,092 26,042
  </div>
  <br><br>
  <pre><code lang="javascript">alert("Hello world");</code></pre>
  <p>
    The <code>push()</code> method adds one or more elements to the end of an array and returns the new length of the
    array.
  </p>
</template>

<style scoped lang='scss'></style>