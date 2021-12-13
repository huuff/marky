<template>
  <the-save-alert 
    :show="showSaveAlert" 
    :fileName="fileName" 
    :actionTaken="lastTakenAction"></the-save-alert>
  <main class="container mx-auto vh-100">
    <the-file-drawer :show="showFileDrawer" @hide="hideFileDrawer"></the-file-drawer>
    <h1 class="display-2 text-center mb-3">Marky</h1>
    <div class="row mb-2">
      <the-name class="col" v-model="fileName"></the-name>
      <a class="col link-secondary" href="#" @click="showFileDrawer = true">Load file</a>
    </div>
    <div class="row h-75">
      <the-editor class="col" v-model="text"></the-editor>
      <rendered-markdown class="col border border-2" :input="text"></rendered-markdown>
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

<script setup lang="ts">
import { ref, onMounted, watch, } from 'vue';
import { useStore } from 'vuex';
import TheEditor from './components/TheEditor.vue';
import RenderedMarkdown from './components/RenderedMarkdown.vue';
import TheName from './components/TheName.vue';
import TheFileDrawer from '@/components/TheFileDrawer.vue';
import TheOverwriteModal from '@/components/TheOverwriteModal.vue';
import TheSaveAlert from '@/components/TheSaveAlert.vue';
import { Action } from '@/actions';

const props = defineProps({
  routeName: {
    type: String,
    required: false,
  },
});

const store = useStore();
const fileName = ref(props.routeName ?? '');
const text = ref(""); 
const showOverwriteModal = ref(false);
const showFileDrawer = ref(false);
const showSaveAlert = ref(false);
const lastTakenAction = ref<Action | null>(null); 

function isOverwriting(fileName: string): boolean {
  const savedContents = store.getters.contents(fileName);
  return savedContents && savedContents !== text.value;
}

function setFile(file: string): void {
  fileName.value = file;
  text.value = store.getters.contents(file) ?? '';
  showSaveAlert.value = true;
  lastTakenAction.value = 'load';
  delayHideAlert();
}

function tryToSave(): void {
  if (isOverwriting(fileName.value)) {
    showOverwriteModal.value = true;
  } else {
    save();
  }
}

function save(): void {
  lastTakenAction.value = isOverwriting(fileName.value) ? 'overwrite' : 'save';
  store.dispatch("saveFile", { name: fileName.value, contents: text.value });
  showOverwriteModal.value = false;
  showSaveAlert.value = true;
  delayHideAlert();
}

function delayHideAlert() {
  setTimeout(() => showSaveAlert.value = false, 1500);
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
</script>

<style scoped>
</style>
