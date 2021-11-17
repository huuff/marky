<template>
  <codemirror :options="cmOptions" v-model:value="value" id="editor"></codemirror>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//@ts-ignore
import Codemirror from "codemirror-editor-vue3";

// plugin-style
import "codemirror-editor-vue3/dist/style.css";

// language
import "codemirror/mode/markdown/markdown.js";

export default defineComponent({
  emits: [ "update:modelValue" ],
  data() {
    return {
      cmOptions:{
        mode: 'text/markdown', // Language mode
        theme: 'default', // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      }
    };
  },
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
  components: {
    Codemirror
  }
})
</script>

<style >
.CodeMirror {
  font-size: 16px;
  font-family: 'Source Code Pro', monospace !important;
}
</style>
