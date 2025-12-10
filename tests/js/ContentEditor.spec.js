import { shallowMount } from '@vue/test-utils';

// Mock TinyMCE before any component imports
jest.mock('tinymce', () => ({
  init: jest.fn(),
  remove: jest.fn(),
  get: jest.fn(() => ({
    setContent: jest.fn(),
    getContent: jest.fn(() => ''),
    destroy: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  })),
  createEditor: jest.fn(),
  EditorManager: {
    get: jest.fn(),
    add: jest.fn(),
  },
  dom: {
    Event: jest.fn(),
  },
  ui: {
    Factory: jest.fn(),
  },
  util: {
    Tools: jest.fn(),
  },
  plugins: {},
  themes: {},
}));

// Mock TinyMCE plugins and themes
jest.mock('tinymce/icons/default/icons.min.js', () => ({}));
jest.mock('tinymce/themes/silver/theme.min.js', () => ({}));
jest.mock('tinymce/models/dom/model.min.js', () => ({}));
jest.mock('tinymce/plugins/code', () => ({}));
jest.mock('tinymce/plugins/fullscreen', () => ({}));
jest.mock('tinymce/plugins/image', () => ({}));
jest.mock('tinymce/plugins/link', () => ({}));
jest.mock('tinymce/plugins/lists', () => ({}));

// Prevent importing and compiling all child .vue files: mock them before requiring the parent
const stubComp = { template: '<div />' };
const childFiles = [
  'CheckboxField', 'CmsMenuField', 'ComponentField', 'CrmFormField', 'CrmOrganisationUnitField',
  'EduCourseField', 'ImageField', 'NumberField', 'RepeaterField', 'SelectField', 'ColorField',
  'TextAreaField', 'TextField', 'WysiwygField'
];

childFiles.forEach(name => {
  try {
    const path = require.resolve(`../../resources/js/components/admin/cms/content/content_fields/${name}.vue`);
    jest.mock(path, () => ({ default: { template: '<div />' } }), { virtual: true });
  } catch (e) {
    // if not present during test environment, ignore
  }
});

const ContentEditor = require('../../resources/js/components/admin/cms/content/ContentEditor.vue').default;

describe('ContentEditor.vue', () => {
  const templateFields = [
    { id: 1, name: 'Title', type: 'text', description: 'Heading' },
    { id: 2, name: 'Body', type: 'wysiwyg', description: 'Body content' },
    { id: 3, name: 'Image', type: 'image', description: 'Hero image' },
  ];

  it('initializes expansion map and editable content', () => {
    const wrapper = shallowMount(ContentEditor, {
      propsData: {
        templateFields,
        content: {}
      },
      stubs: ['WysiwygField', 'TextField', 'ImageField']
    });

    const vm = wrapper.vm;

    // first field expanded by default
    expect(vm.expanded[1]).toBe(true);
    expect(vm.expanded[2]).toBe(false);
    expect(vm.expanded[3]).toBe(false);

    // editableContent entries created for each field
    expect(Object.keys(vm.editableContent).sort()).toEqual(['1','2','3']);
    expect(vm.editableContent[1].data).toBeNull();
  });

  it('filters visibleFields by searchQuery', async () => {
    const wrapper = shallowMount(ContentEditor, {
      propsData: { templateFields, content: {} },
      stubs: ['WysiwygField', 'TextField', 'ImageField']
    });

    const vm = wrapper.vm;
    expect(vm.visibleFields.length).toBe(3);

    wrapper.setData({ searchQuery: 'image' });
    await wrapper.vm.$nextTick();

    expect(vm.visibleFields.length).toBe(1);
    expect(vm.visibleFields[0].type).toBe('image');
  });

  it('toggleExpand emits input and ensures editableContent entry', async () => {
    const wrapper = shallowMount(ContentEditor, {
      propsData: { templateFields, content: {} },
      stubs: ['WysiwygField', 'TextField', 'ImageField']
    });

    const vm = wrapper.vm;
    // Clear editableContent for field 2 to test the initialization logic
    delete vm.editableContent[2];
    // start with second field collapsed
    expect(vm.expanded[2]).toBe(false);

    // spy on $emit
    const spy = jest.spyOn(vm, '$emit');
    vm.toggleExpand(2);
    await vm.$nextTick();

    expect(vm.expanded[2]).toBe(true);
    // editableContent added for the field id 2
    expect(vm.editableContent[2]).toBeDefined();
    expect(spy).toHaveBeenCalledWith('input', expect.any(Object));
  });

  it('sets button elements to type="button" so they do not submit forms', () => {
    const wrapper = shallowMount(ContentEditor, {
      propsData: { templateFields, content: {} },
      stubs: ['WysiwygField', 'TextField', 'ImageField']
    });

    // First, ensure TOC button exists and has type=button
    const tocButton = wrapper.find('aside button');
    expect(tocButton.exists()).toBe(true);
    expect(tocButton.attributes('type')).toBe('button');

    // Expand toggle button in the first field should also be type=button
    const toggleBtn = wrapper.find('.border .px-4 .ml-4 button');
    // fallback: find any button in the header area
    expect(toggleBtn.exists()).toBe(true);
    expect(toggleBtn.attributes('type')).toBe('button');
  });

  it('scrollToField expands and uses scrollIntoView when present', async () => {
    const wrapper = shallowMount(ContentEditor, {
      propsData: { templateFields, content: {} },
      stubs: ['WysiwygField', 'TextField', 'ImageField']
    });

    const vm = wrapper.vm;

    // simulate a ref element with scrollIntoView
    const fakeEl = { scrollIntoView: jest.fn() };
    vm.fieldRefs = { 3: fakeEl };

    vm.expanded[3] = false;
    vm.scrollToField(3);
    await vm.$nextTick();

    expect(vm.expanded[3]).toBe(true);
    expect(fakeEl.scrollIntoView).toHaveBeenCalled();
  });
});
