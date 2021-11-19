<template>
  <div class="text-align-baseline">
    <label class="text-muted me-2" for="nameInput">File: </label>
    <input 
      v-show="currentlyEditing"
      v-model="name" 
      type="text" 
      ref="input"
      id="nameInput" 
      @blur="endEditing"
      @keyup.enter="endEditing"
      @keyup.escape="endEditing"
      >
    <span 
      v-show="!currentlyEditing"
      @click="startEditing"
      class="clickable"
      > {{ name }}
      <font-awesome-icon icon="pencil-alt" class="ms-1" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue';

export default defineComponent({
  emits: [ "update:modelValue" ],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const currentlyEditing = ref(false);
    const input = ref<HTMLInputElement | null>(null);
    const name = computed({
      get: () => props.modelValue,
      set: (value: string) => emit("update:modelValue", value),
    });

    function startEditing(): void {
      currentlyEditing.value = true;
      
      nextTick(() => {
        input.value?.focus();
      });
    }

    function endEditing(): void {
      currentlyEditing.value = false;
    }

    return { currentlyEditing, name, input, startEditing, endEditing };
  },
});
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
