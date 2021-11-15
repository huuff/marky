<template>
  <div v-html="markdown"></div>
</template>

<script lang="ts">
import { defineComponent, } from 'vue';
import Markdown from 'markdown-it';

const md = new Markdown();

export default defineComponent({
  props: {
    input: {
      type: String,
      required: true
    },
  },
  computed: {
    markdown(): string {
      return md.render(this.input);
    },
  },
});

</script>
