<template>
<transition name="fade">
  <div class="alert text-center w-50 mx-auto fixed-top" :class="`alert-${color}`" v-show="show" role="alert">
    File <span class="fst-italic">{{fileName}}</span> was {{actionDescription}}.
  </div>
</transition>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { Action } from '@/actions';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  fileName: {
    type: String,
    required: true,
  },
  actionTaken: {
    type: String as PropType<Action>,
    required: false,
  },
});

const color = computed(() => {
  if (props.actionTaken == 'overwrite')
    return 'warning';
  else if (props.actionTaken == 'load')
    return 'success';
  else
    return 'primary';
});

const actionDescription = computed(() => {
  if (props.actionTaken == 'overwrite')
    return 'overwritten';
  else if (props.actionTaken == 'load')
    return 'loaded';
  else
    return 'saved';
});


</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
