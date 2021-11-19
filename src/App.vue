<template>
  <main class="container mx-auto vh-100">
    <h1 class="display-2 text-center mb-3">Editor</h1>
    <div class="row mb-2">
      <the-name class="col" v-model="fileName"></the-name>
      <the-file-selector class="col" :current="fileName" ></the-file-selector>
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
import { defineComponent, ref, computed, onMounted, watch, } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
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
  components: {
    TheEditor, TheRender, TheName, TheFileSelector
  },
  setup(props) {
    const router = useRouter();
    const text = ref(""); 
    const store = useStore();

    const fileName = computed({
      get: () => props.routeName ?? '',
      set: (value: string) => router.replace(value),
    });


    function setName(name: string): void {
      fileName.value = name;
    }

    function setFile(file: string) {
      setName(file);
      text.value = localStorage.getItem(file) ?? '';
    }

    function save(): void {
      localStorage.setItem(fileName.value, text.value);
      if (!store.getters.fileExists(fileName.value)) {
        store.dispatch("addFile", fileName.value);
      }
    }

    onMounted(() => {
      if (props.routeName) {
        setFile(props.routeName);
      } else {
        fileName.value = store.getters.nextUntitled;
      }
    });

    watch(() => props.routeName, newRoute => {
      if (store.getters.fileExists(newRoute)) {
        setFile(newRoute ?? '');
      }
    });

    return { text, fileName, setName, setFile, save };
  },
});
</script>

<style scoped>
</style>
