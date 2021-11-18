<template>
  <main class="container mx-auto vh-100">
    <h1 class="display-2 text-center mb-3">Editor</h1>
    <div class="row mb-2">
      <the-name class="col" v-model="fileName"></the-name>
      <the-file-selector class="col" :current="fileName" @set-file="setFile"></the-file-selector>
    </div>
    <div class="row h-75">
      <the-editor class="col" v-model="text"></the-editor>
      <the-render class="col" :input="text"></the-render>
    </div>
    <div class="text-center">
      <button class="btn btn-primary mx-auto my-3" @click="save">Save</button>
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
  props: {
    routeName: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    text: "",
  } as { 
    text: string;
    fileName: string;
  }),
  components: {
    TheEditor, TheRender, TheName, TheFileSelector
  },
  watch: {
    routeName(value: string) {
      this.setFile(value);
    },
  },
  computed: {
    fileName: {
      get(): string {
        return this.routeName ?? '';
      },
      set(value: string) {
        return this.$router.replace(value);
      }
    },
  },
  mounted() {
  // TODO: can I do this in store.ts?
    Object.keys(localStorage).forEach(key => {
      this.$store.dispatch("addFile", key);
    });
    if (this.routeName) {
      this.setFile(this.routeName);
    } else {
      this.fileName = this.$store.getters.nextUntitled; 
    }
  },
  methods: {
    save(): void {
      localStorage.setItem(this.fileName, this.text); 
      if (!this.$store.getters.fileExists(this.fileName)) {
        this.$store.dispatch("addFile", this.fileName);
      }
    },
    setName(name: string) {
      this.fileName = name;
    },
    setFile(file: string) {
      this.setName(file);
      this.text = localStorage.getItem(file) ?? '';
    },
  },
});
</script>

<style scoped>
</style>
