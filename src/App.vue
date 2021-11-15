<template>
  <main class="container mx-auto vh-100">
    <h1 class="display-2 text-center mb-3">Marky</h1>
    <div class="row h-75">
      <div class="col">
        <textarea v-model="text"></textarea>
      </div>
      <div class="col" v-html="markdown"></div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Markdown from 'markdown-it';

const md = new Markdown();

export default defineComponent({
  name: 'App',
  data: () => ({
    text: ""
  } as { 
    text: string;
  }),
  computed: {
    markdown() {
      return md.render(this.text);
    },
  },
});
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100%
}
</style>
