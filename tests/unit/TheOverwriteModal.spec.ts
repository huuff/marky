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

    expect(wrapper.element.classList).not.toContain("show");
  });

  describe('when show is true', () => {
    const overwritingFile = "Test Name";
    const wrapper = mount(TheOverwriteModal, {
      props: {
        show: true,
        overwritingFile
      }, 
    });

    it("it is shown", () => {
      expect(wrapper.element.classList).toContain("show");
    });

  });

});
