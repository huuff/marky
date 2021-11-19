<template>
  <teleport to="body">
  <div class="modal" tabindex="-1" ref="modal" id="overwriteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</teleport>
</template>


<script lang="ts">
import { defineComponent, watch, onMounted, ref } from 'vue';
import { Modal } from 'bootstrap';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    /*const modal = ref(null);*/
    /*let bootstrapModal: Modal = new bootstrap.Modal("#overwriteModal", {});*/
    const modal = ref<Element | null>(null);
    let bootstrapModal: null | Modal = null;

    onMounted(() => {
      if (modal.value) {
        bootstrapModal = new Modal(modal.value, {});
      }
    });

    watch(() => props.show, (newValue: boolean) => {
      console.log(`watching for modal show, this time: ${props.show}`);
      if (newValue) {
        bootstrapModal?.show();
      } else {
        bootstrapModal?.hide();
      }
    });
    return { modal };
  },
});
</script>
