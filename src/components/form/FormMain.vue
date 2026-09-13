<script setup lang="ts">
  import { ref, reactive, defineEmits } from 'vue';
  import type { Message, PhoneContent } from '@/types/PhoneContent.ts'
  import TimeMessageForm from '@/components/form/TimeMessageForm.vue'

  defineEmits<{
    update: [content: PhoneContent],
  }>();

  const phoneContent = reactive<PhoneContent>({
    recipient: '',
    isGroup: false,
    chatName: '',
    messages: [],
  });

  function addMessage() {
    const newMessage: Message = {
      type: 'message',
      name: '',
      text: '',
    };

    phoneContent.messages.push(newMessage);
  }
</script>

<template>
  <form autocomplete="off" class="form-host" onsubmit="return false">
    <div class="form-line">
      <label for="recipient">Recipient (person that's looking at the phone)</label>
      <input type="text" name="recipient" id="recipient" v-model="phoneContent.recipient" />
    </div>

    <div v-if="phoneContent.isGroup" class="form-line">
      <label for="group">Group name</label>
      <input type="text" name="group" id="group" v-model="phoneContent.chatName" />
    </div>

    <div class="form-line" v-for="(message, idx) in phoneContent.messages" :key="`${idx}-${message.type}`">
      <select name="type" id="type" v-model="phoneContent.messages[idx].type">
        <option value="message">Text</option>
        <option value="time">Timestamp</option>
        <option value="img">Photo</option>
      </select>

      <TimeMessageForm v-model="phoneContent.messages[idx]" v-if="phoneContent.messages[idx].type === 'time'" />
    </div>

    <div class="form-line row">
      <button type="button" @click.prevent="$emit('update', phoneContent)">Update Preview</button>
      <button type="button" @click.prevent="addMessage()">Add Message</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
  .form-host {
    display: flex;
    flex-direction: column;

    div {

    }
  }

  button {
    padding: 10px;
    border-radius: 0 0 10px 0;
  }
</style>
