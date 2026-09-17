<script setup lang="ts">
defineProps<{
  htmlContent: string
}>();
</script>

<template>
  <textarea :value="htmlContent" readonly/>
</template>

<style scoped lang="scss">
  textarea {
    width: 100%;
    min-width: 500px;
    min-height: 500px;
    height: 100%;
    border: 1px solid blue;
  }
</style>
