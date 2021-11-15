<template>
  <textarea v-model="value"></textarea>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: [ "update:modelValue" ],
  props: {
    modelValue: String,
  }, 
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      },
    },
  },
})
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100%;
}
</style>
