<template>
 <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel" ref="offcanvasElement">
  <div class="offcanvas-header">
    <h5 id="offcanvasTopLabel">Saved files</h5>
    <button type="button" class="btn-close text-reset" aria-label="Close" @click="$emit('hide')"></button>
  </div>
  <div class="offcanvas-body row gap-2">
    <div v-for="file in files" :key="`file-${file}`" class="file-card card col-sm-2 col-xl-1 px-0" @click="setFile(file)">
      <h6 class="card-header">{{file}}</h6>
      <div class="card-body">
        <div class="rendered-markdown">
          <rendered-markdown
            class="file-contents fs-6 text-nowrap"
            :input="fileContents(file)"></rendered-markdown>
        </div>
      </div>
    </div>
  </div>
</div> 
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Offcanvas } from 'bootstrap';
import RenderedMarkdown from '@/components/RenderedMarkdown.vue'

const emit = defineEmits(["hide"]);
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const store = useStore(); 
const router = useRouter();
const offcanvasElement = ref<Element | null>(null);
const files = computed(() => store.getters.fileNames)
const fileContents = store.getters.contents;

let offcanvas: null | Offcanvas;

onMounted(() => {
   if (offcanvasElement.value) {
     offcanvas = new Offcanvas(offcanvasElement.value);
     if (props.show) {
       offcanvas.show();
     }
   }
});

watch(() => props.show, (newValue: boolean) => {
  if (newValue) {
    offcanvas?.show();
  } else {
    offcanvas?.hide();
  }
});

function setFile(fileName: string): void {
  router.push(fileName);
  emit("hide");
}
</script>

<style>
.card {
  cursor: pointer;
  max-height: 100%;
}

.rendered-markdown {
  overflow: hidden;
}

.file-contents {
  transform: scale(0.5);
  transform-origin: 0 0;
}
</style>
