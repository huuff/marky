import { mount } from '@vue/test-utils';
import TheRender from '@/components/TheRender.vue';

describe('TheRender.vue', () => {
  it("properly renders markdown", () => {
    const wrapper = mount(TheRender, {
      props: { input: "# Test"},
    });

    expect(wrapper.html()).toContain("<h1>Test</h1>");
  });
});
