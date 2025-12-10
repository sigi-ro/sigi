import { shallowMount } from '@vue/test-utils';

// stub out child components imported by Edit.vue so requiring the file doesn't pull in many other files
const simpleStub = { template: '<div />' };
[
  '../../resources/js/components/core/forms/InputGroup.vue',
  '../../resources/js/components/core/forms/SelectGroup.vue',
  '../../resources/js/components/admin/cms/urls/UrlEditor.vue',
  '../../resources/js/components/admin/cms/content/ContentEditor.vue',
  '../../resources/js/components/admin/cms/metadata/MetadataEditor.vue'
].forEach(p => {
  try {
    const resolved = require.resolve(p);
    jest.mock(resolved, () => ({ default: { template: '<div />' } }), { virtual: true });
  } catch(e) {
    // ignore if path can't be resolved in CI/test environment
  }
});

// provide a minimal axios stub used at module scope in Edit.vue
global.axios = {
  CancelToken: {
    source() { return { cancel: () => {} }; }
  },
  isCancel: () => false,
  get: () => Promise.resolve({ data: {} })
};

// require the component after setting up global axios stub below
let EditPage;

// provide a minimal axios stub used at module scope in Edit.vue
global.axios = {
  CancelToken: {
    source() { return { cancel: () => {} }; }
  },
  isCancel: () => false,
  get: () => Promise.resolve({ data: {} })
};

// require (import) the component now that axios is defined
EditPage = require('../../resources/js/pages/admin/cms/page/Edit.vue').default;

describe('Edit.vue (Page Edit tabs)', () => {
  const minimalProps = {
    layouts: {},
    page: { id: 42, template_id: null, template: { template_fields: [] }, content: {}, url: {} },
    parentPages: {},
    templates: {}
  };

  beforeEach(() => {
    // clear any existing key
    localStorage.removeItem('admin_page_edit_active_tab_42');
  });

  it('reads activeTab from localStorage when present', () => {
    localStorage.setItem('admin_page_edit_active_tab_42', 'fields');
    const wrapper = shallowMount(EditPage, { propsData: minimalProps, stubs: ['InputGroup','SelectGroup','UrlEditor','ContentEditor','MetadataEditor'], mocks: { userCan: () => true, $route: () => '' } });
    expect(wrapper.vm.activeTab).toBe('fields');
  });

  it('normalizes invalid localStorage values to layout on mount', async () => {
    localStorage.setItem('admin_page_edit_active_tab_42', 'nope');
    const wrapper = shallowMount(EditPage, { propsData: minimalProps, stubs: ['InputGroup','SelectGroup','UrlEditor','ContentEditor','MetadataEditor'], mocks: { userCan: () => true, $route: () => '' } });
    // mounted() fixes invalid values
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.activeTab).toBe('layout');
  });

  it('onTabListKeydown navigates tabs using arrow keys', () => {
    const wrapper = shallowMount(EditPage, { propsData: minimalProps, stubs: ['InputGroup','SelectGroup','UrlEditor','ContentEditor','MetadataEditor'], mocks: { userCan: () => true, $route: () => '' } });

    // default is layout
    expect(wrapper.vm.activeTab).toBe('layout');

    // simulate ArrowRight to move to meta
    wrapper.vm.onTabListKeydown({ key: 'ArrowRight', preventDefault: jest.fn() });
    expect(wrapper.vm.activeTab).toBe('meta');

    // simulate ArrowLeft to move back to layout
    wrapper.vm.onTabListKeydown({ key: 'ArrowLeft', preventDefault: jest.fn() });
    expect(wrapper.vm.activeTab).toBe('layout');
  });
});
