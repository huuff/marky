import { mount } from '@vue/test-utils';
import { Action } from '@/actions';
import TheActionAlert from '@/components/TheActionAlert.vue';

describe('TheActionAlert.vue', () => {
  const fileName = 'Test Name';

  it('is not shown when show is false', () => {
    const wrapper = mount(TheActionAlert, {
      props: { show: false, fileName }
    });

    expect(wrapper.find(".alert").isVisible()).toBe(false);
  });

  describe('When show is true', () => {
    const show = true;

    it('it shown', () => {
      const wrapper = mount(TheActionAlert, { props: { show, fileName } });

      expect(wrapper.find(".alert").isVisible()).toBe(true);
    });

    it('contains the file name', () => {
      const wrapper = mount(TheActionAlert, { props: { show, fileName }});

      expect(wrapper.text()).toContain(fileName);
    });
  });
});
