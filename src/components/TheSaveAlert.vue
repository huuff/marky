<template>
<div class="alert text-center w-50 mx-auto fixed-top" :class="`alert-${color}`" v-show="show" role="alert">
  File {{fileName}} was {{isOverwriting ? 'overwritten' : 'saved'}}.
</div>
</template>

<script setup lang="ts">
// TODO: The overwritten : saved part is not working
// TODO: fade animations
import { ref } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  fileName: {
    type: String,
    required: true,
  },
  isOverwriting: {
    type: Boolean,
    required: true,
  },
});

const color = ref('primary');

</script>
