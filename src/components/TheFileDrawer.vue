<template>
 <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel" ref="offcanvasElement">
  <div class="offcanvas-header">
    <h5 id="offcanvasTopLabel">Saved files</h5>
    <button type="button" class="btn-close text-reset" aria-label="Close" @click="$emit('hide')"></button>
  </div>
  <div class="offcanvas-body d-flex flex-row gap-2">
    <div v-for="file in files" :key="`file-${file}`" class="card" @click="setFile(file)">
      <div class="card-body">
        <h6 class="card-title">{{ file }}</h6>
        <p class="card-text">File contents should go here</p>
      </div>
    </div>
  </div>
</div> 
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Offcanvas } from 'bootstrap';

export default defineComponent({
  emits: [ "hide" ],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore(); 
    const router = useRouter();
    const offcanvasElement = ref<Element | null>(null);
    const files = computed(() => store.getters.fileNames)

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

    return { files, offcanvasElement, setFile };
  }
});
</script>

<style>
.card {
  cursor: pointer;
}
</style>
