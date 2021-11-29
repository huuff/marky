<template>
 <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasTopLabel">Saved files</h5>
    <button type="button" class="btn-close text-reset" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div v-for="file in files">
      {{ file }}
    </div>
  </div>
</div> 
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
   const store = useStore(); 

   const files = store.getters.fileNames;
  }
});
</script>

<style>
</style>
