<template>
  <main class="container mx-auto vh-100">
    <the-file-drawer :show="showFileDrawer" @hide="hideFileDrawer"></the-file-drawer>
    <h1 class="display-2 text-center mb-3">Marky</h1>
    <div class="row mb-2">
      <the-name class="col" v-model="fileName"></the-name>
      <a class="col link-secondary" href="#" @click="showFileDrawer = true">Load file</a>
    </div>
    <div class="row h-75">
      <the-editor class="col" v-model="text"></the-editor>
      <the-render class="col border border-2" :input="text"></the-render>
    </div>
    <div class="text-center">
      <button class="btn btn-primary mx-auto my-3" @click="tryToSave">
      Save<font-awesome-icon icon="save" class="ms-2" />
      </button>
    </div>
  </main>
  <the-overwrite-modal 
    :show="showOverwriteModal" 
    :overwritingFile="fileName"
    @cancel="hideOverwriteModal"
    @save="save"
    ></the-overwrite-modal>
  
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, } from 'vue';
import { useStore } from 'vuex';
import TheEditor from './components/TheEditor.vue';
import TheRender from './components/TheRender.vue';
import TheName from './components/TheName.vue';
import TheFileDrawer from '@/components/TheFileDrawer.vue';
import TheOverwriteModal from '@/components/TheOverwriteModal.vue';


export default defineComponent({
  name: 'App',
  props: {
    routeName: {
      type: String,
      required: false,
    },
  },
  components: {
    TheEditor, TheRender, TheName, TheFileDrawer, TheOverwriteModal
  },
  setup(props) {
    const store = useStore();
    const fileName = ref(props.routeName ?? '');
    const text = ref(""); 
    const showOverwriteModal = ref(false);
    const showFileDrawer = ref(false);

    function isOverwriting(fileName: string): boolean {
      const savedContents = store.getters.contents(fileName);
      return savedContents && savedContents !== text.value;
    }

    function setFile(file: string): void {
      fileName.value = file;
      text.value = store.getters.contents(file) ?? '';
    }

    function tryToSave(): void {
      if (isOverwriting(fileName.value)) {
        showOverwriteModal.value = true;
      } else {
        save();
      }
    }

    function save(): void {
      store.dispatch("saveFile", { name: fileName.value, contents: text.value });
      showOverwriteModal.value = false;
     }

    function hideOverwriteModal(): void {
      showOverwriteModal.value = false;
    }

    function hideFileDrawer(): void {
      showFileDrawer.value = false;
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

    return { 
      text, 
      fileName, 
      setFile, 
      tryToSave, 
      save, 
      showOverwriteModal, 
      hideOverwriteModal,
      showFileDrawer,
      hideFileDrawer,
    };
  },
});
</script>

<style scoped>
</style>
