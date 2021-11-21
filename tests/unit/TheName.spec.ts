import { mount } from '@vue/test-utils'
import TheName from '@/components/TheName.vue'

describe('TheName.vue', () => {
  const name = 'Test Name';
  const wrapper = mount(TheName, {
    props: { modelValue: name },
    global: {
      stubs: [ 'font-awesome-icon' ],
    },
  });

  it('renders a span with name', () => {
    expect(wrapper.text()).toMatch(name);
  });

  it('changes to input on click', async () => {
    const nameSpan = wrapper.find("span");

    await nameSpan.trigger("click");
    const nameInput = wrapper.find("input");

    expect(wrapper).not.toContain(nameSpan);
    expect(nameInput.exists()).toBe(true);
    expect(nameInput.element.value).toBe(name);
  });

  const newName = "New Name";
  it('changes value', async () => {
    const nameInput = wrapper.find("input");

    nameInput.element.value = newName;
    await nameInput.trigger("input");

    const emitted = wrapper.emitted();
    expect(emitted).toHaveProperty("update:modelValue");
    expect(emitted["update:modelValue"][0]).toContain(newName);
  });

  it('stops editing', async () => {
    const nameInput = wrapper.find("input");

    await nameInput.trigger("blur");

    const nameSpan = wrapper.find("span");
    expect(wrapper).not.toContain(nameInput);
    expect(nameSpan.exists()).toBe(true);
  });
});
