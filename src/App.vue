<script setup lang="ts">
import { useTemplateRef } from 'vue';

import FormMain from '@/components/form/FormMain.vue'
import type { PhoneContent } from '@/types/PhoneContent.ts'
import { getStyle, renderPhoneContent } from '@/utils/phoneUtils.ts'

const iframe = useTemplateRef<HTMLIFrameElement>('iframe');

function setIframeContent(content: PhoneContent) {
  const rendered = renderPhoneContent(content);

  const style = document.createElement('style');

  style.innerHTML = getStyle();

  const wrapper = document.createElement('div');
  wrapper.id = 'workskin';

  wrapper.innerHTML = rendered;

  const body = document.createElement('body');

  body.append(style, wrapper)

  iframe.value!.style.backgroundColor = 'lightgray';
  iframe.value!.contentWindow!.document.body.innerHTML = body.innerHTML
}
</script>

<template>
  <header>
    <FormMain @update="setIframeContent" />
  </header>

  <main>
    right: preview (has toggle for disabling workskin)

    <iframe ref="iframe" frameborder="1" width="100%" height="100%"></iframe>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
