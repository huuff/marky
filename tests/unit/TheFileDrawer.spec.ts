import { mount, } from '@vue/test-utils';
import { createStore } from 'vuex';
import TheFileDrawer from '@/components/TheFileDrawer.vue';

const mockStore = createStore({
  getters: {

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
  });
});
