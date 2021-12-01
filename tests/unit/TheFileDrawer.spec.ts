import { mount, } from '@vue/test-utils';
import { createStore } from 'vuex';
import TheFileDrawer from '@/components/TheFileDrawer.vue';

const mockFiles: { [name : string]: string } = {
 "File1": "",
 "File2": "",
 "File3": "",
};

const mockStore = createStore({
  getters: {
    fileNames() {
      return Object.keys(mockFiles);
    },
    contents() {
      return (fileName: string) => mockFiles[fileName];
    },
  },
});

describe('TheFileDrawer.vue', () => {
  it("is not shown when show is false", () => {
    const wrapper = mount(TheFileDrawer, {
      props: { show: false },
      global: {
        provide: { store: mockStore },
      },
    });

    expect(wrapper.element.classList).not.toContain("show");
  });

  describe('when show is true', () => {
    const wrapper = mount(TheFileDrawer, {
      props: { show: true },
      global: {
        provide: { store: mockStore },
      },
    });

    it('is shown', () => {
      expect(wrapper.element.classList).toContain("show");
    });

    describe('with the files', () => {
      const fileCards = wrapper.findAll(".file-card");

      it('there is one card for each', () => {
        expect(fileCards.length).toBe(Object.keys(mockFiles).length); 
      });
    });
  });
});
