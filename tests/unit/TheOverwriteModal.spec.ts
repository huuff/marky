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

    it("is shown", () => {
      expect(wrapper.element.classList).toContain("show");
    });

    it("it contains the filename", () => {
      expect(wrapper.html()).toContain(`<span class="fst-italic">${overwritingFile}</span>`)
    });

    it("saves when overwrite is clicked", async () => {
      await wrapper.find("#overwriteButton").trigger("click");

      expect(wrapper.emitted()).toHaveProperty("save");
    });

    it("cancels when cancel is clicked", async () => {
      await wrapper.find("#cancelButton").trigger("click");

      expect(wrapper.emitted()).toHaveProperty("cancel");
    });

  });

});
