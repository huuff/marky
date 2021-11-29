import { mount } from '@vue/test-utils'
import TheOverwriteModal from '@/components/TheOverwriteModal.vue'

describe('TheOverwriteModal.vue', () => {
  const modalId = "overwriteModal";
  
  it('is shown when passed show', () => {
    const overwritingFile = 'Test Name';

    const wrapper = mount(TheOverwriteModal, {
      props: {
        show: true,
        overwritingFile,
      }, 
    });

    const modal = document.getElementById(modalId);
    expect(modal).not.toBeNull;
    expect(modal!.innerHTML.includes(`<span class="fst-italic">${overwritingFile}</span`))
  });

  it("is not shown when show is false", () => {
    const wrapper = mount(TheOverwriteModal, {
      props: {
        show: false,
        overwritingFile: "",
      }, 
    });

    expect(document.getElementById(modalId)).not.toBeNull();
  });
});
