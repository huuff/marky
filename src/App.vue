<template>
  <main class="container mx-auto vh-100">
    <h1 class="display-2 text-center mb-3">Editor</h1>
    <div class="row mb-2">
      <the-name class="col" @set-name="setName"></the-name>
      <!-- TODO: remove the set-file binding -->
      <the-file-selector class="col" :current="name" @set-file="setFile"></the-file-selector>
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
    filename: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    text: "",
    name: "",
  } as { 
    text: string;
    name: string;
  }),
  components: {
    TheEditor, TheRender, TheName, TheFileSelector
  },
  mounted() {
    Object.keys(localStorage).forEach(key => {
      this.$store.dispatch("addFile", key);
    });
    if (this.filename) {
      this.setFile(this.filename);
    }
  },
  beforeRouteUpdate(to: any) {
    this.setFile(to.params.filename as string);
  },
  methods: {
    save(): void {
      localStorage.setItem(this.name, this.text); 
      // TODO: better vuex usage
      if (!this.$store.files.includes(this.name)) {
        this.$store.files.push(this.name);
      }
    },
    setName(name: string) {
      this.name = name;
    },
    setFile(file: string) {
      this.name = file;
      this.text = localStorage.getItem(file) ?? '';
    },
  },
});
</script>

<style scoped>
</style>
