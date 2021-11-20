<template>
  <div class="d-flex flex-row align-items-baseline">
    <label class="text-muted text-nowrap me-3" for="fileSelector">Current file: </label> 
    <select class="form-select flex-grow-1" id="fileSelector" @change="(e) => setFile(e.target.value)"> 
      <option :selected="files.length === 0" value=""> Choose one</option>
      <option v-for="file in files" :key="`file-${file}`" :value="file" :selected="file === current">{{ file }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  emits: [ "set-file" ],
  props: {
    current: {
      type: String,
      required: true
    },
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const files = computed(() => store.getters.fileNames);

    function setFile(fileName: string) {
      if (fileName !== null) {
        router.push(fileName);
      }
    }

    return { files, setFile };
  },
});
</script>
