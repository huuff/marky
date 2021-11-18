<template>
  <div class="d-flex flex-row align-items-baseline">
    <label class="text-muted text-nowrap me-3" for="fileSelector">Current file: </label> 
    <select class="form-select flex-grow-1" id="fileSelector" @change="setFile"> 
      <option :selected="files.length === 0" value=""> Choose one</option>
      <option v-for="file in files" :key="`file-${file}`" :value="file" :selected="file === current">{{ file }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, } from 'vue';

export default defineComponent({
  emits: [ "set-file" ],
  props: {
    current: {
      type: String,
      required: true
    },
  },
  computed: {
    files() {
      return this.$store.getters.files;
    }
  },
  methods: {
    setFile(event: Event) {
      const selector = event.target as HTMLSelectElement;
      if (selector.value !== null) {
        this.$router.push(selector.value)
      }
    }
  },
});
</script>
