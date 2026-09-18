<script setup lang="ts">
  import { reactive } from 'vue';
  import type { Message, PhoneContent } from '@/types/PhoneContent.ts'
  import TimeMessageForm from '@/components/form/TimeMessageForm.vue'
  import TextMessageForm from '@/components/form/TextMessageForm.vue'
  import ImgMessageForm from '@/components/form/ImgMessageForm.vue'

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
      {
        type: 'time',
        day: 'Today',
        time: '1:05 AM',
      },
      {
        type: 'img',
        url: 'https://i.duncte123.me/ao3/livaaaa/img/InvisoSnoozing.png',
        desc: 'Demo image'
      },
    ],
  });

  // TODO: list of names that the user supplies and can pick from (helps with consistency)

  const people = reactive([
    'Danny',
    'Jazz',
  ]);

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
    const content: PhoneContent = JSON.parse(JSON.stringify(phoneContent));

    if (content.isGroup) {
      if (!content.chatName) {
        content.chatName = 'Unnamed Chat';
      }
    } else {
      let firstSenderName: string | null = null;

      // Fix up any stray magical non people in a 1 to 1 convo
      for (const msg of content.messages) {
        if (msg.type === 'message' && msg.name !== content.recipient) {
          if (!firstSenderName) {
            firstSenderName = msg.name;
          } else {
            msg.name = firstSenderName;
          }
        }
      }

      content.chatName = firstSenderName ?? 'Unknown Recipient';
    }

    // @ts-ignore what?
    emit('update', content);
  }

  updatePreview();
</script>

<template>
  <form autocomplete="off" class="form-host" onsubmit="return false">
<!-- TODO: finish this feature  -->
<!--    <div class="form-line people-list">
      <p>People in the conversation:</p>
      <div class="name-item" v-for="(name, idx) in people" :key="name + idx">
        <input type="text" v-model="people[idx]" />
        <button v-if="idx > 0" @click.prevent="people.splice(idx, 1)">❌</button>
      </div>

      <button @click.prevent="people.push('')">Add</button>
    </div>-->

    <div class="form-line row">
      <input type="checkbox" v-model="phoneContent.isGroup" name="isGroup" id="isGroup" />
      <label for="isGroup">This is a group chat</label>
    </div>

     <div v-if="phoneContent.isGroup" class="form-line">
        <label for="group">Group name</label>
        <input type="text" name="group" id="group" v-model="phoneContent.chatName" />
     </div>

    <hr />

    <div class="form-line">
      <label for="recipient">Recipient (person that's looking at the phone)</label>
      <input type="text" name="recipient" id="recipient" v-model="phoneContent.recipient" />
    </div>

    <hr />

    <div class="form-line" v-for="(message, idx) in phoneContent.messages" :key="`${idx}-${message.type}`">
      <select name="type" id="type" v-model="phoneContent.messages[idx].type">
        <option value="message">Text</option>
        <option value="time">Timestamp</option>
        <option value="img">Photo</option>
      </select>

      <TextMessageForm v-model="phoneContent.messages[idx]" v-if="phoneContent.messages[idx].type === 'message'" />
      <ImgMessageForm v-model="phoneContent.messages[idx]" v-else-if="phoneContent.messages[idx].type === 'img'" />
      <TimeMessageForm v-model="phoneContent.messages[idx]" v-else-if="phoneContent.messages[idx].type === 'time'" />

      <button type="button"
              class="delete"
              @click.prevent="deleteMessage(idx)"
              :disabled="phoneContent.messages.length === 1"
      >Delete</button>

      <hr />
    </div>

    <div class="form-line row">
      <button type="button" @click.prevent="updatePreview()">Update Preview</button>
      <button type="button" @click.prevent="addMessage()">Add Message</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
  .people-list {

    .name-item {
      margin-bottom: 5px;
    }

    button {
      padding: unset;
      border-radius: unset;
    }
  }

  .form-host {
    display: flex;
    flex-direction: column;

    &.row {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  hr {
    margin-top: 10px;
    margin-bottom: 10px;
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
