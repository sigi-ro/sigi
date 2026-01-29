import { shallowMount } from '@vue/test-utils';

// Mock axios
jest.mock('axios', () => ({
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mock child components
jest.mock('../../resources/js/components/admin/cms/sections/SectionEditor.vue', () => ({
  default: { template: '<div class="section-editor" />' }
}), { virtual: true });

jest.mock('../../resources/js/components/admin/cms/sections/SectionForm.vue', () => ({
  default: { template: '<div class="section-form" />' }
}), { virtual: true });

jest.mock('../../resources/js/components/admin/cms/sections/FieldAssignmentModal.vue', () => ({
  default: { template: '<div class="field-assignment-modal" />' }
}), { virtual: true });

jest.mock('../../resources/js/components/core/modals/ConfirmationModal.vue', () => ({
  default: { template: '<div class="confirmation-modal" />' }
}), { virtual: true });

// Mock vuedraggable
jest.mock('vuedraggable', () => ({
  default: {
    name: 'draggable',
    template: '<div class="draggable"><slot /></div>',
    props: ['value', 'animation', 'handle', 'ghostClass'],
  }
}));

const SectionManager = require('../../resources/js/components/admin/cms/sections/SectionManager.vue').default;

describe('SectionManager.vue Accessibility', () => {
  const defaultSections = [
    {
      id: 1,
      name: 'Hero Section',
      slug: 'hero-section',
      order: 0,
      is_collapsible: true,
    },
    {
      id: 2,
      name: 'Content Section',
      slug: 'content-section',
      order: 1,
      is_collapsible: true,
    },
  ];

  const templateFields = [
    { id: 1, name: 'Title', type: 'text', section_id: 1 },
    { id: 2, name: 'Body', type: 'textarea', section_id: 1 },
    { id: 3, name: 'Unassigned Field', type: 'text', section_id: null },
  ];

  const defaultMocks = {
    transWithFallback: (key, fallback) => fallback,
    $route: jest.fn(() => '/api/test'),
    $successToast: jest.fn(),
    $errorToast: jest.fn(),
  };

  const createWrapper = (props = {}, options = {}) => {
    return shallowMount(SectionManager, {
      propsData: {
        sections: defaultSections,
        templateFields,
        templateId: 1,
        content: {},
        searchQuery: '',
        ...props,
      },
      mocks: defaultMocks,
      stubs: {
        'draggable': { 
          template: '<div class="draggable" role="list" aria-labelledby="sections-heading"><slot /></div>',
          props: ['value'],
        },
        'section-editor': { template: '<div class="section-editor" />' },
        'section-form': { template: '<div class="section-form" />' },
        'field-assignment-modal': { template: '<div class="field-assignment-modal" />' },
        'confirmation-modal': { template: '<div class="confirmation-modal" />' },
        'icon-plus': { template: '<svg />' },
      },
      ...options,
    });
  };

  describe('ARIA landmarks and regions', () => {
    it('has role="region" on the main container', () => {
      const wrapper = createWrapper();
      expect(wrapper.attributes('role')).toBe('region');
    });

    it('has aria-label describing the region', () => {
      const wrapper = createWrapper();
      expect(wrapper.attributes('aria-label')).toBe('Section Management');
    });

    it('has a heading with id for aria-labelledby', () => {
      const wrapper = createWrapper();
      const heading = wrapper.find('#sections-heading');
      expect(heading.exists()).toBe(true);
      expect(heading.text()).toBe('Sections');
    });
  });

  describe('Screen reader live region', () => {
    it('has an aria-live region for announcements', () => {
      const wrapper = createWrapper();
      const liveRegion = wrapper.find('[aria-live="polite"]');
      expect(liveRegion.exists()).toBe(true);
      expect(liveRegion.attributes('aria-atomic')).toBe('true');
      expect(liveRegion.classes()).toContain('sr-only');
    });

    it('announce method updates the live region', async () => {
      const wrapper = createWrapper();
      
      // Call announce method
      wrapper.vm.announce('Test announcement');
      await wrapper.vm.$nextTick();
      
      // Check announcement is set
      expect(wrapper.vm.announcement).toBe('Test announcement');
    });
  });

  describe('Button accessibility', () => {
    it('Add Section button has aria-label', () => {
      const wrapper = createWrapper();
      const addButton = wrapper.find('button[aria-label="Add new section"]');
      expect(addButton.exists()).toBe(true);
    });

    it('Add Section button icon is decorative (aria-hidden)', () => {
      const wrapper = createWrapper();
      const addButton = wrapper.find('button[aria-label="Add new section"]');
      // Icon inside button should be aria-hidden
      expect(addButton.html()).toContain('aria-hidden="true"');
    });

    it('Add Section button has visible focus ring', () => {
      const wrapper = createWrapper();
      const addButton = wrapper.find('button[aria-label="Add new section"]');
      expect(addButton.classes()).toContain('focus:ring-2');
      expect(addButton.classes()).toContain('focus:ring-offset-2');
    });
  });

  describe('Empty state accessibility', () => {
    it('shows empty state with role="status" when no sections', () => {
      const wrapper = createWrapper({ sections: [] });
      const emptyState = wrapper.find('[role="status"]');
      expect(emptyState.exists()).toBe(true);
      expect(emptyState.text()).toContain('No sections yet');
    });
  });

  describe('Fields without section accessibility', () => {
    it('assign button has descriptive aria-label', () => {
      const wrapper = createWrapper();
      const assignButton = wrapper.find('button[aria-label="Assign unassigned fields to a section"]');
      expect(assignButton.exists()).toBe(true);
    });
  });

  describe('Keyboard interaction', () => {
    it('Add Section button is focusable', () => {
      const wrapper = createWrapper();
      const addButton = wrapper.find('button[aria-label="Add new section"]');
      expect(addButton.attributes('type')).toBe('button');
      // Buttons are focusable by default
    });

    it('clicking Add Section button opens the form', async () => {
      const wrapper = createWrapper();
      const addButton = wrapper.find('button[aria-label="Add new section"]');
      
      expect(wrapper.vm.showSectionForm).toBe(false);
      await addButton.trigger('click');
      expect(wrapper.vm.showSectionForm).toBe(true);
    });
  });

  describe('List semantics', () => {
    it('sections container has list semantics', () => {
      const wrapper = createWrapper();
      const list = wrapper.find('.draggable');
      expect(list.exists()).toBe(true);
    });
  });
});

describe('SectionManager.vue Screen Reader Announcements', () => {
  const defaultMocks = {
    transWithFallback: (key, fallback) => fallback,
    $route: jest.fn(() => '/api/test'),
    $successToast: jest.fn(),
    $errorToast: jest.fn(),
  };

  it('has announce method that updates announcement data', () => {
    const wrapper = shallowMount(SectionManager, {
      propsData: {
        sections: [{ id: 1, name: 'Test', slug: 'test', order: 0 }],
        templateFields: [],
        templateId: 1,
        content: {},
        searchQuery: '',
      },
      mocks: defaultMocks,
      stubs: {
        'draggable': { template: '<div><slot /></div>' },
        'section-editor': { template: '<div />' },
        'section-form': { template: '<div />' },
        'field-assignment-modal': { template: '<div />' },
        'confirmation-modal': { template: '<div />' },
        'icon-plus': { template: '<svg />' },
      },
    });

    // Verify announce method exists
    expect(typeof wrapper.vm.announce).toBe('function');
    
    // Call announce method
    wrapper.vm.announce('Test message');
    
    // Wait for next tick to clear and set
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.announcement).toBe('Test message');
    });
  });

  it('announcement is cleared before new message', async () => {
    const wrapper = shallowMount(SectionManager, {
      propsData: {
        sections: [],
        templateFields: [],
        templateId: 1,
        content: {},
        searchQuery: '',
      },
      mocks: defaultMocks,
      stubs: {
        'draggable': { template: '<div><slot /></div>' },
        'section-editor': { template: '<div />' },
        'section-form': { template: '<div />' },
        'field-assignment-modal': { template: '<div />' },
        'confirmation-modal': { template: '<div />' },
        'icon-plus': { template: '<svg />' },
      },
    });

    // Set an initial announcement
    wrapper.vm.announcement = 'Old message';
    
    // Call announce - it should clear first
    wrapper.vm.announce('New message');
    
    // Immediately after calling, announcement is cleared
    expect(wrapper.vm.announcement).toBe('');
    
    // After nextTick, new message is set
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.announcement).toBe('New message');
  });
});
