<template>
  <main class="container mx-auto vh-100">
    <h1 class="display-2 text-center mb-3">Marky</h1>
    <div class="row mb-2">
      <the-name class="col"></the-name>
      <the-file-selector class="col" :files="files"></the-file-selector>
    </div>
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
import TheName from './components/TheName.vue';
import TheFileSelector from './components/TheFileSelector.vue';


export default defineComponent({
  name: 'App',
  data: () => ({
    text: "",
    files: [],
  } as { 
    text: string;
    files: string[];
  }),
  components: {
    TheEditor, TheRender, TheName, TheFileSelector
  },
});
</script>

<style scoped>
</style>
