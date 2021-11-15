<template>
  <div>
    <label class="text-muted me-2" for="nameInput">File: </label>
    <input 
      v-show="currentlyEditing"
      v-model="name" 
      type="text" 
      ref="input"
      id="nameInput" 
      @blur="endEditing">
    <span 
      v-show="!currentlyEditing"
      @click="startEditing"
      > {{ name }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    name: 'Untitled',
    currentlyEditing: false,
  } as {
    name: string;
    currentlyEditing: boolean;
  }),
  methods: {
    startEditing(): void {
      this.currentlyEditing = true;

      this.$nextTick(() => this.$refs.input.focus());
    },
    endEditing(): void {
      this.currentlyEditing = false;
    },
  },
});
</script>

