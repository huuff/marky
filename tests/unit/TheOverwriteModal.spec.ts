import { mount } from '@vue/test-utils'
import TheOverwriteModal from '@/components/TheOverwriteModal.vue'

describe('TheOverwriteModal.vue', () => {
  const modalId = "overwriteModal";

  it("is not shown when show is false", () => {
    const wrapper = mount(TheOverwriteModal, {
      props: {
        show: false,
        overwritingFile: "",
      }, 
    });
    expect(wrapper.find(`#${modalId}`).isVisible()).toBe(false);
  });

});
