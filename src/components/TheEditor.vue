<template>
  <codemirror :options="cmOptions" v-model:value="value" id="editor"></codemirror>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
//@ts-ignore
import Codemirror from "codemirror-editor-vue3";

// plugin-style
import "codemirror-editor-vue3/dist/style.css";

// language
import "codemirror/mode/markdown/markdown.js";

export default defineComponent({
  components: {
    Codemirror
  },
  emits: [ "update:modelValue" ],
  props: {
    modelValue: {
      type: String,
      required: true,
    }
  }, 
  setup(props, { emit }) {
    const cmOptions = reactive({
        mode: 'text/markdown', // Language mode
        theme: 'default', // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
    }); 


    const value = computed({
      get: () => props.modelValue,
      set: (value: string) => emit("update:modelValue", value),
    });

    return { cmOptions, value };
  },
})
</script>

<style >
.CodeMirror {
  font-size: 16px;
  font-family: 'Source Code Pro', monospace !important;
}
</style>
