<script setup lang="ts">
import { ref } from 'vue'

import FormMain from '@/components/form/FormMain.vue'
import type { PhoneContent } from '@/types/PhoneContent.ts'
import { renderPhoneContent } from '@/utils/phoneUtils.ts'
import RendererWrapper from '@/components/renderer/RendererWrapper.vue'

const renderedHtml = ref('<h1>Press update to see a preview</h1>')

function setIframeContent(content: PhoneContent) {
  renderedHtml.value = renderPhoneContent(content);
}
</script>

<template>
  <header>
    <FormMain @update="setIframeContent" />
  </header>

  <main>
    <RendererWrapper :html-content="renderedHtml"/>
  </main>

  <footer>
    <a href="https://github.com/duncte123/ao3-phone-generator" target="_blank">Source code</a> - <a href="https://archiveofourown.org/works/6434845/chapters/14729722" target="_blank">CodenameCarrot's fic explaining the html</a> - Made by Humans, for Humans. No AI was used to build this project.
  </footer>
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
