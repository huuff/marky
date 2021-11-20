<template>
  <teleport to="body">
  <div class="modal" tabindex="-1" ref="modal" id="overwriteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">File <span class="fst-italic">{{overwritingFile}}</span> already exists</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="this.$emit('cancel')"></button>
        </div>
        <div class="modal-body">
          <p>Do you want to overwrite it?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="this.$emit('cancel')">Cancel</button>
          <button type="button" class="btn btn-danger" @click="this.$emit('save')">Overwrite</button>
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
  emits: [ "save", "cancel" ],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    overwritingFile: {
      type: String,
      required: true,
    }
  },

  setup(props) {
    const modal = ref<Element | null>(null);
    let bootstrapModal: null | Modal = null;

    onMounted(() => {
      if (modal.value) {
        bootstrapModal = new Modal(modal.value, {
          keyboard: false,
          backdrop: 'static',
        });
      }
    });

    watch(() => props.show, (newValue: boolean) => {
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
