<template>
 <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel" ref="offcanvasElement" data-bs-backdrop="false">
  <div class="offcanvas-header">
    <h5 id="offcanvasTopLabel">Saved files</h5>
    <button type="button" class="btn-close text-reset" aria-label="Close" @click="$emit('hide')"></button>
  </div>
  <div class="offcanvas-body row gap-2">
    <div  class="carousel slide carousel-dark" data-bs-ride="false" data-bs-wrap="false"  id="drawerCarousel">
    <div class="carousel-inner" >
      <div class="carousel-item"
      v-for="[i, box] in divideIntoBoxes(files, 5).entries()"
      :key="`box-${i}`"
      :class="i === 0 ? 'active' : ''">
      <div class="d-flex flex-row">
        <div v-for="file in box" :key="`file-${file}`" class="file-card card px-0 mx-2" @click="setFile(file)">
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
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#drawerCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#drawerCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  </div>
</div> 
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Offcanvas, } from 'bootstrap';
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
const files = computed(() => store.getters.fileNames)
const fileContents = store.getters.contents;

const offcanvasElement = ref<Element | null>(null);
let offcanvas: null | Offcanvas;
const carouselElement = ref<Element | null>(null);

onMounted(() => {
   if (offcanvasElement.value) {
     offcanvas = new Offcanvas(offcanvasElement.value);
     if (props.show) {
       offcanvas.show();
     }
   }
   /*if (carouselElement.value) {*/
     /*carousel = new Carousel(carouselElement.value);*/
   /*}*/
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

function divideIntoBoxes(files: string[], filesPerBox: number): string[][] {
  const numOfBoxes = Math.ceil(files.length / filesPerBox);
  const boxes = new Array<Array<string>>(numOfBoxes);

  for (const [i, file] of files.entries()) {
    const boxIndex = Math.floor(i / filesPerBox);
    if (!boxes[boxIndex])
      boxes[boxIndex] = new Array<string>();
    boxes[boxIndex].push(file);
  }

  return boxes;
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
