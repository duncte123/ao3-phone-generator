<script setup lang="ts">
  import { ref } from 'vue';
  import HTMLRenderer from '@/components/renderer/HTMLRenderer.vue'
  import PreviewRenderer from '@/components/renderer/PreviewRenderer.vue'
  import CSSRenderer from '@/components/renderer/CSSRenderer.vue'

  const selected = ref('preview');

  defineProps<{
    htmlContent: string;
  }>();
</script>

<template>
  <div class="tabs">
    <button @click.prevent="selected = 'preview'" :class="{selected: selected === 'preview'}">Preview</button>
    <button @click.prevent="selected = 'html'" :class="{selected: selected === 'html'}">HTML</button>
    <button @click.prevent="selected = 'css'" :class="{selected: selected === 'css'}">CSS</button>
  </div>


  <div class="content">
    <PreviewRenderer v-if="selected === 'preview'" :html-content="htmlContent" />
    <HTMLRenderer v-if="selected === 'html'" :html-content="htmlContent"/>
    <CSSRenderer v-if="selected === 'css'"/>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: space-between;

  button {
    border: 1px solid #f6ecbf;
    background: cornsilk;
    cursor: pointer;
    padding: 10px;
    font-size: 20px;

    &.selected {
      background: cornflowerblue;
    }
  }
}

.content {
  margin-top: 10px;
}
</style>
