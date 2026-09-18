<script setup lang="ts">
  import { onMounted, useTemplateRef, ref, defineProps, watch } from 'vue';
  import { getStyle } from '@/utils/phoneUtils.ts'

  const workskinEnabled = ref(true);
  const iframe = useTemplateRef<HTMLIFrameElement>('iframe');

  const props = defineProps<{
    htmlContent: string
  }>();

  function updateFrame() {

    const wrapper = document.createElement('div');
    wrapper.id = 'workskin';

    wrapper.innerHTML = props.htmlContent;

    const body = document.createElement('body');

    if (workskinEnabled.value) {
      const style = document.createElement('style');

      style.innerHTML = getStyle();

      body.append(style);
    }

    body.append(wrapper);

    iframe.value!.style.backgroundColor = 'ghostwhite';
    iframe.value!.contentWindow!.document.body.innerHTML = body.innerHTML
  }

  onMounted(() => {
    updateFrame();
  });

  watch(() => props.htmlContent, () => {
    updateFrame();
  });

  watch(workskinEnabled, () => {
    updateFrame();
  });
</script>

<template>
  <div>
    <label for="workskinToggle">Enable css in workskin </label>
    <input type="checkbox" v-model="workskinEnabled" id="workskinToggle" />
  </div>
  <iframe ref="iframe" width="100%" height="100%"></iframe>
</template>

<style scoped lang="scss">
iframe {
  min-width: 500px;
  min-height: 500px;
  height: 80vh;
  border: 1px solid blue;
}
</style>
