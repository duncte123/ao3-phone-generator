<script setup lang="ts">
  import type { TextMessage } from '@/types/PhoneContent.ts'

  defineProps<{
    modelValue: TextMessage,
  }>();

  defineEmits<{
    'update:modelValue': [value: TextMessage],
  }>();

</script>

<template>
  <div class="form-line">
    <label for="from">Sender</label>
    <input type="text" id="from" name="from" v-model="modelValue.name" />
  </div>
  <div class="form-line">
    <label for="content">Message</label>
    <textarea type="text" id="content" name="content" v-model="modelValue.text" />
  </div>
</template>

<style scoped lang="scss">

</style>
