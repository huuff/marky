<template>
  <main class="container mx-auto vh-100">
    <h1 class="display-2 text-center mb-3">Marky</h1>
    <name-input class="mb-2"></name-input>
    <div class="row h-75">
      <the-editor class="col" v-model="text"></the-editor>
      <the-render class="col" :input="text"></the-render>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheEditor from './components/TheEditor.vue';
import TheRender from './components/TheRender.vue';
import NameInput from './components/TheNameInput.vue';

export default defineComponent({
  name: 'App',
  data: () => ({
    text: ""
  } as { 
    text: string;
  }),
  components: {
    TheEditor, TheRender, NameInput,
  },
});
</script>

<style scoped>
</style>
