import { mount } from '@vue/test-utils';
import RenderedMarkdown from '@/components/RenderedMarkdown.vue';

describe('TheRender.vue', () => {
  it("properly renders markdown", () => {
    const wrapper = mount(RenderedMarkdown, {
      props: { input: "# Test"},
    });

    expect(wrapper.html()).toContain("<h1>Test</h1>");
  });
});
