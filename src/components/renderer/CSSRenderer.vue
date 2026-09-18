<script setup lang="ts">
  import { getStyle } from '@/utils/phoneUtils.ts'

  const css = getStyle().trim();
</script>

<template>
  <p>This CSS code needs to be placed in the workskin for your fic.
    It already contains everything you need for this generator.</p>
  <textarea :value="css" readonly/>
</template>

<style scoped lang="scss">
  textarea {
    width: 100%;
    min-height: 500px;
    min-width: 500px;
    height: 100%;
    border: 1px solid blue;
  }
</style>
