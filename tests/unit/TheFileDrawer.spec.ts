import { mount, } from '@vue/test-utils';
import { createStore } from 'vuex';
import TheFileDrawer from '@/components/TheFileDrawer.vue';

const mockFiles: { [name : string]: string } = {
 "File1": "contents1",
 "File2": "contents2",
 "File3": "contents3",
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

      describe("with each file", () => {
        for (const [i, fileCard] of fileCards.entries()) {
          const expectedFileName = Object.keys(mockFiles)[i];
          it('it contains a header with the name', () => {
            expect(fileCard.find(".card-header").text())
              .toBe(expectedFileName)
          });
          
          it('it contains the file contents', () => {
            expect(fileCard.find(".file-contents").text())
              .toBe(mockFiles[expectedFileName])
          });
        }
      });
    });
  });
});
