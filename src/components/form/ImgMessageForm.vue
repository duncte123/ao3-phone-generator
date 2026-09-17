<script setup lang="ts">
  import type { ImageMessage } from '@/types/PhoneContent.ts'

  defineProps<{
    modelValue: ImageMessage,
  }>();

  defineEmits<{
    'update:modelValue': [value: ImageMessage],
  }>();

</script>

<template>
  <div class="form-line">
    <label for="imgUrl">Image Url (readers will be able to click to enlarge the image)</label>
    <input type="text" id="imgUrl" name="imgUrl" v-model="modelValue.url" />
  </div>
  <div class="form-line">
    <label for="content">Image description (E.G. Danny sleeping on a couch)</label>
    <textarea type="text" id="content" name="content" v-model="modelValue.desc" />
  </div>
</template>

<style scoped lang="scss">

</style>
