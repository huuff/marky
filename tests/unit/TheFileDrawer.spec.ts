import { mount, VueWrapper, DOMWrapper } from '@vue/test-utils';
import { createTestingPinia } from "@pinia/testing";
import { useRouter } from 'vue-router';
import { useStore } from "@/store";
import TheFileDrawer from '@/components/TheFileDrawer.vue';
import { File } from "@/file";

const mockFiles: { [name : string]: string } = {
 "File1": "contents1",
 "File2": "contents2",
 "File3": "contents3",
};

jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({
    push: () => {} // eslint-disable-line
  }))
}))

function mockStore() {
  const store = useStore();
  //store.files.value = 

  const filesToMock = Object.keys(mockFiles)
    .map(fileName => ({ [fileName]: {
      name: fileName,
      contents: mockFiles[fileName] 
    }}))
    .reduce((prev, next) => ({ ...prev, ...next}));
  store.files = filesToMock;
}

beforeEach(() => mockStore())

function allFileCards(wrapper: VueWrapper<any>): DOMWrapper<Element>[] {
  return wrapper.findAll(".file-card");
}

describe('TheFileDrawer.vue', () => {
  it("is not shown when show is false", () => {
    const wrapper = mount(TheFileDrawer, {
      props: { show: false },
      global: {
        plugins: [ createTestingPinia() ],
      },
    });
    mockStore();

    expect(wrapper.element.classList).not.toContain("show");
  });

  describe('when show is true', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementationOnce(() => ({
      push
    }));

    const wrapper = mount(TheFileDrawer, {
      props: { show: true },
      global: {
        plugins: [ createTestingPinia() ],
      },
    });
    mockStore();

    it('is shown', () => {
      expect(wrapper.element.classList).toContain("show");
    });

    describe('with the files', () => {
      const fileCards = wrapper.findAll(".file-card");

      it('there is one card for each', () => {
        expect(allFileCards(wrapper).length).toBe(Object.keys(mockFiles).length); 
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

          it('routes to file on click', async () => {

            await fileCard.trigger('click');

            expect(push).toHaveBeenCalledTimes(1);
            expect(push).toHaveBeenCalledWith(expectedFileName);
            push.mockClear();
          });
        }
      });
    });
  });
});
