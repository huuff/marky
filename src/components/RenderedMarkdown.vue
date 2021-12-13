<template>
  <div v-html="markdown"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Markdown from 'markdown-it';

const props = defineProps({
  input: {
    type: String,
    required: true,
  }
});

const renderer = new Markdown();
const markdown = computed(() => renderer.render(props.input))
</script>
