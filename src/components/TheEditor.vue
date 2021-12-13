<template>
  <codemirror :options="cmOptions" v-model:value="value" id="editor"></codemirror>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
//@ts-ignore
import Codemirror from 'codemirror-editor-vue3';
import 'codemirror-editor-vue3/dist/style.css';
import 'codemirror/mode/markdown/markdown.js';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(["update:modelValue"]);

const cmOptions = reactive({
  mode: 'text/markdown',
  theme: 'default',
  lineNumbers: true,
  smartIndent: true,
  indentUnit: 2,
  foldGutter: true,
  styleActiveLine: true,
});

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value)
});
</script>


<style >
.CodeMirror {
  font-size: 16px;
  font-family: 'Source Code Pro', monospace !important;
}
</style>
