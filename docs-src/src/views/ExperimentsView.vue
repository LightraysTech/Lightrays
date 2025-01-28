<script setup>
import Card from '@/components/Card.vue';
import Graph from '@/components/Graph.vue';

</script>

<template>

  <div class="flex-center">
    <h3>Title</h3>
    <div style="margin-left: auto">
      <button class="small flat">Button</button>
    </div>
  </div> <br>
  <h6>Subheader</h6>
  <div class="lr-list inline-components">
    <Card>
      <template #default>List Item</template>
      <template #description>Description</template>
      <template #right>
        <button class="subtle"><i class="fluentIcon more_horizontal_regular"></i></button>
      </template>
    </Card>
    <Card>
      <template #default>List Item</template>
      <template #description>Description</template>
      <template #right>
        <button class="subtle"><i class="fluentIcon more_horizontal_regular"></i></button>
      </template>
    </Card>
    <Card>
      <template #default>List Item</template>
      <template #description>Description</template>
      <template #right>
        <button class="subtle"><i class="fluentIcon more_horizontal_regular"></i></button>
      </template>
    </Card>
    <Card>
      <template #left>
        <input type="checkbox" name="" id="">
      </template>
      <template #default>List Item</template>
      <template #description>Description</template>
      <template #right>
        <button class="subtle"><i class="fluentIcon more_horizontal_regular"></i></button>
      </template>
    </Card>
    <Card>
      <template #left>
        <input type="checkbox" name="" id="">
      </template>
      <template #default>List Item</template>
      <template #description>Description</template>
      <template #right>
        <button class="subtle"><i class="fluentIcon more_horizontal_regular"></i></button>
      </template>
    </Card>
    <Card>
      <template #left>
        <input type="checkbox" name="" id="">
      </template>
      <template #default>List Item</template>
      <template #right>
        <button class="subtle"><i class="fluentIcon more_horizontal_regular"></i></button>
      </template>
    </Card>
    <Card>
      <template #left>
        <i class="fluentIcon re_order_dots_vertical_regular" style="color: var(--subtle-text-color);"></i>
      </template>
      <template #default>List Item</template>
      <template #right>
        <button class="subtle"><i class="fluentIcon more_horizontal_regular"></i></button>
      </template>
    </Card>
    <Card>
      <template #left>
        <i class="fluentIcon re_order_dots_vertical_regular" style="color: var(--subtle-text-color);"></i>
      </template>
      <template #default>List Item</template>
      <template #right>
        <button class="subtle"><i class="fluentIcon more_horizontal_regular"></i></button>
      </template>
    </Card>
  </div>
  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
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
  <h4>Chroma</h4>
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