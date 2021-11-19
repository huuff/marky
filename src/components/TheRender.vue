<template>
  <div v-html="markdown"></div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Markdown from 'markdown-it';

const md = new Markdown();

export default defineComponent({
  props: {
    input: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const markdown = computed(() => md.render(props.input));

    return { markdown };
  }
});

</script>
