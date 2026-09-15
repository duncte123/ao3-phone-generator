<script setup lang="ts">
  import { ref, reactive, defineEmits, unref } from 'vue';
  import type { Message, PhoneContent, TextMessage } from '@/types/PhoneContent.ts'
  import TimeMessageForm from '@/components/form/TimeMessageForm.vue'
  import TextMessageForm from '@/components/form/TextMessageForm.vue'

  const emit = defineEmits<{
    update: [content: PhoneContent],
  }>();

  const phoneContent = reactive<PhoneContent>({
    recipient: 'Danny',
    isGroup: false,
    chatName: '',
    messages: [
      {
        type: 'time',
        day: 'Monday',
        time: '15:53',
      },
      {
        type: 'message',
        name: 'Danny',
        text: 'Hi Jazz'
      },
      {
        type: 'message',
        name: 'Jazz',
        text: 'Hi Danny'
      },
    ],
  });

  // TODO: list of names that the user supplies and can pick from (helps with consistency)

  function addMessage() {
    const newMessage: Message = {
      type: 'message',
      name: '',
      text: '',
    };

    phoneContent.messages.push(newMessage);
  }

  // addMessage();

  function deleteMessage(idx: number) {
    phoneContent.messages.splice(idx, 1);
  }

  function updatePreview() {
    const content: PhoneContent = phoneContent;

    if (!content.chatName && !content.isGroup) {
      const found = content.messages.find(
        (msg) => msg.type === 'message' && msg.name !== content.recipient,
      );

      // @ts-ignore it's always a text message.
      content.chatName = found?.name ?? 'Unknown Recipient';
    }

    // @ts-ignore what?
    emit('update', content);
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

      <TextMessageForm v-model="phoneContent.messages[idx]" v-if="phoneContent.messages[idx].type === 'message'" />
      <TimeMessageForm v-model="phoneContent.messages[idx]" v-else-if="phoneContent.messages[idx].type === 'time'" />

      <button type="button"
              class="delete"
              @click.prevent="deleteMessage(idx)"
              :disabled="phoneContent.messages.length === 1"
      >Delete</button>
    </div>

    <div class="form-line row">
      <button type="button" @click.prevent="updatePreview()">Update Preview</button>
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
    cursor: pointer;

    &.delete {
      padding: unset;
      border-radius: unset;
      font-weight: bold;
      background: #f85353;

      &[disabled] {
        background: #ffa0a0;
        cursor: not-allowed;
      }
    }
  }
</style>
