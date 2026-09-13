<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import type { PhoneContent } from '@/types/PhoneContent.ts'

  const emit = defineEmits<{
    update: [content: PhoneContent],
  }>();

  const recipient = ref('');

  const groupName = ref('');
  const isGroup = ref(true);
</script>

<template>
  <form autocomplete="off" class="form-host" onsubmit="return false">
    <div class="">
      <label for="recipient">Recipient (person that's looking at the phone)</label>
      <input type="text" name="recipient" id="recipient" v-model="recipient" />
    </div>

    <div v-if="isGroup">
      <label for="group">Group name</label>
      <input type="text" name="group" id="group" v-model="groupName" />
    </div>

    <div>
      <button type="button">Update</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
  .form-host {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
  }

  button {
    padding: 10px;
    border-radius: 0 0 10px 0;
  }
</style>
