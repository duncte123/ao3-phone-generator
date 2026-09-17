<script setup lang="ts">
  import type { TimeMessage } from '@/types/PhoneContent.ts'

  defineProps<{
    modelValue: TimeMessage,
  }>();

  defineEmits<{
    'update:modelValue': [value: TimeMessage],
  }>();

</script>

<template>
  <div class="form-line">
    <label for="day">Day (e.g. Today or Monday)</label>
    <input type="text" id="day" name="day" v-model="modelValue.day" />
  </div>
  <div class="form-line">
    <label for="time">Time (e.g. 19:25 or 5:38 AM)</label>
    <input type="text" id="time" name="time" v-model="modelValue.time" />
  </div>
</template>

<style scoped lang="scss">

</style>
