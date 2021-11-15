<template>
  <div class="d-flex flex-row align-items-baseline">
    <label class="text-muted text-nowrap me-3" for="fileSelector">Current file: </label> 
    <select class="form-select flex-grow-1" id="fileSelector"> 
      <option :selected="files.length === 0"> Choose one</option>
      <option v-for="file in files" :key="`file-${file}`" :selected="file === current">{{ file }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    files: {
      type: Array as PropType<Array<string>>,
      required: true
    },
    current: {
      type: String,
      required: true
    },
  },
});
</script>
