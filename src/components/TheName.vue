<template>
  <div class="text-align-baseline">
    <label class="text-muted me-2" for="nameInput">File: </label>
    <input 
      v-if="currentlyEditing"
      v-model="name" 
      type="text" 
      ref="input"
      id="nameInput" 
      @blur="endEditing"
      @keyup.enter="endEditing"
      @keyup.escape="endEditing"
      >
    <span 
      v-else
      @click="startEditing"
      class="clickable"
      > {{ name }}
      <font-awesome-icon icon="pencil-alt" class="ms-1" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  }
});

const emit = defineEmits([ "update:modelValue" ]);

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
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
