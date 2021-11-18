<template>
  <div class="text-align-baseline">
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
      > {{ name }}
      <font-awesome-icon icon="pencil-alt" class="ms-1" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: [ "update:modelValue" ],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    currentlyEditing: false,
  } as {
    currentlyEditing: boolean;
  }),
  computed: {
    name: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    startEditing(): void {
      this.currentlyEditing = true;

      this.$nextTick(() => {
        (this.$refs.input as HTMLInputElement).focus();
      });
    },  
    endEditing(): void {
      this.currentlyEditing = false;
    },
  },
});
</script>

