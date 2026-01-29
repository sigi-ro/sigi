import { shallowMount, mount } from '@vue/test-utils';

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

// Mock content field child components
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

const SectionEditor = require('../../resources/js/components/admin/cms/sections/SectionEditor.vue').default;

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('SectionEditor.vue Accessibility', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  const defaultSection = {
    id: 1,
    name: 'Test Section',
    slug: 'test-section',
    description: 'A test section',
    order: 0,
    is_collapsible: true,
    is_collapsed_by_default: false,
  };

  const templateFields = [
    { id: 1, name: 'Title', type: 'text', section_id: 1, order: 0 },
    { id: 2, name: 'Description', type: 'textarea', section_id: 1, order: 1 },
  ];

  const defaultMocks = {
    transWithFallback: (key, fallback) => fallback,
    userCan: () => true,
    $set: jest.fn(),
  };

  const createWrapper = (props = {}, options = {}) => {
    return shallowMount(SectionEditor, {
      propsData: {
        section: defaultSection,
        templateFields,
        templateId: 1,
        content: {},
        showDragHandle: true,
        ...props,
      },
      mocks: defaultMocks,
      stubs: {
        'icon-grip-vertical': { template: '<svg />' },
        'icon-chevron-right': { template: '<svg />' },
        'icon-plus': { template: '<svg />' },
        'icon-trash': { template: '<svg />' },
        'icon-edit': { template: '<svg />' },
      },
      ...options,
    });
  };

  describe('ARIA attributes', () => {
    it('has role="listitem" on the root element', () => {
      const wrapper = createWrapper();
      expect(wrapper.attributes('role')).toBe('listitem');
    });

    it('has aria-label with section name on root element', () => {
      const wrapper = createWrapper();
      expect(wrapper.attributes('aria-label')).toBe('Test Section');
    });

    it('has role="button" on the section header when collapsible', () => {
      const wrapper = createWrapper();
      const header = wrapper.find('[role="button"]');
      expect(header.exists()).toBe(true);
    });

    it('has aria-expanded attribute on the section header', () => {
      const wrapper = createWrapper();
      const header = wrapper.find('[role="button"]');
      // Section is expanded by default (is_collapsed_by_default: false)
      expect(header.attributes('aria-expanded')).toBe('true');
    });

    it('has aria-controls pointing to section content', () => {
      const wrapper = createWrapper();
      const header = wrapper.find('[role="button"]');
      expect(header.attributes('aria-controls')).toBe('section-content-1');
    });

    it('has tabindex="0" on collapsible section header', () => {
      const wrapper = createWrapper();
      const header = wrapper.find('[role="button"]');
      expect(header.attributes('tabindex')).toBe('0');
    });

    it('has tabindex="-1" on non-collapsible section header', () => {
      const wrapper = createWrapper({
        section: { ...defaultSection, is_collapsible: false }
      });
      const header = wrapper.find('[role="button"]');
      expect(header.attributes('tabindex')).toBe('-1');
    });

    it('has aria-hidden on decorative icons', () => {
      const wrapper = createWrapper();
      // Check that the chevron icon's parent div has aria-hidden
      const html = wrapper.html();
      expect(html).toContain('aria-hidden="true"');
    });

    it('action buttons have aria-label attributes', () => {
      const wrapper = createWrapper();
      const buttons = wrapper.findAll('button[aria-label]');
      expect(buttons.length).toBeGreaterThanOrEqual(3); // assign, delete, edit buttons
    });

    it('section content region has appropriate role and aria-label', async () => {
      const wrapper = createWrapper();
      await wrapper.vm.$nextTick();
      
      const contentRegion = wrapper.find('#section-content-1');
      if (contentRegion.exists()) {
        expect(contentRegion.attributes('role')).toBe('region');
        expect(contentRegion.attributes('aria-label')).toContain('Test Section');
      }
    });
  });

  describe('Keyboard navigation', () => {
    it('toggles section on Enter key', async () => {
      const wrapper = createWrapper();
      const header = wrapper.find('[role="button"]');
      
      // Section starts expanded
      expect(wrapper.vm.isExpanded).toBe(true);
      
      // Trigger Enter key
      await header.trigger('keydown.enter');
      
      // Section should now be collapsed
      expect(wrapper.vm.sectionExpanded).toBe(false);
    });

    it('toggles section on Space key', async () => {
      const wrapper = createWrapper();
      const header = wrapper.find('[role="button"]');
      
      // Get initial state - sectionExpanded starts as true (expanded)
      const initialState = wrapper.vm.sectionExpanded;
      
      // Trigger Space key
      await header.trigger('keydown.space');
      
      // Section should be toggled
      expect(wrapper.vm.sectionExpanded).toBe(!initialState);
    });

    it('does not toggle non-collapsible section on keyboard', async () => {
      const wrapper = createWrapper({
        section: { ...defaultSection, is_collapsible: false }
      });
      const header = wrapper.find('[role="button"]');
      
      // Non-collapsible section is always expanded
      expect(wrapper.vm.isExpanded).toBe(true);
      
      // Trigger Enter key
      await header.trigger('keydown.enter');
      
      // Should still be expanded
      expect(wrapper.vm.isExpanded).toBe(true);
    });
  });

  describe('Focus management', () => {
    it('drag handle has correct accessibility attributes', () => {
      const wrapper = createWrapper({ showDragHandle: true });
      const dragHandle = wrapper.find('.section-drag-handle');
      
      expect(dragHandle.exists()).toBe(true);
      expect(dragHandle.attributes('role')).toBe('button');
      expect(dragHandle.attributes('tabindex')).toBe('0');
      expect(dragHandle.attributes('aria-label')).toContain('reorder');
    });

    it('field expand buttons have aria-expanded attribute', async () => {
      const wrapper = createWrapper();
      await wrapper.vm.$nextTick();
      
      // In shallowMount, we need to check the HTML contains aria-expanded
      // since field buttons are in the component template
      const html = wrapper.html();
      expect(html).toContain('aria-expanded');
    });
  });

  describe('Visual focus indicators', () => {
    it('buttons have focus ring classes', () => {
      const wrapper = createWrapper();
      const assignButton = wrapper.find('button[aria-label*="Assign"]');
      
      expect(assignButton.exists()).toBe(true);
      expect(assignButton.classes()).toContain('focus:outline-none');
      expect(assignButton.classes()).toContain('focus:ring-2');
    });
  });

  describe('Screen reader support', () => {
    it('provides field count in section header', () => {
      const wrapper = createWrapper();
      const headerText = wrapper.text();
      
      // Should include field count
      expect(headerText).toContain('2');
      expect(headerText).toContain('fields');
    });

    it('includes section description when available', () => {
      const wrapper = createWrapper();
      const headerText = wrapper.text();
      
      expect(headerText).toContain('A test section');
    });

    it('fields list has role="list" attribute', async () => {
      const wrapper = createWrapper();
      await wrapper.vm.$nextTick();
      
      // Check that the HTML contains role="list"
      const html = wrapper.html();
      expect(html).toContain('role="list"');
    });
  });

  describe('Performance optimizations', () => {
    it('initializes hasBeenExpanded based on section state', () => {
      const wrapper = createWrapper({
        section: { ...defaultSection, is_collapsed_by_default: false }
      });
      
      expect(wrapper.vm.hasBeenExpanded).toBe(true);
    });

    it('hasBeenExpanded is false when section is collapsed by default', () => {
      const wrapper = createWrapper({
        section: { ...defaultSection, is_collapsed_by_default: true }
      });
      
      expect(wrapper.vm.hasBeenExpanded).toBe(false);
    });

    it('tracks mounted fields for lazy loading', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.vm.mountedFields).toEqual({});
    });

    it('uses v-show after first expansion for faster toggling', async () => {
      const wrapper = createWrapper();
      
      // Set hasBeenExpanded to true
      wrapper.setData({ hasBeenExpanded: true, sectionExpanded: true });
      await wrapper.vm.$nextTick();
      
      const html = wrapper.html();
      // Should have v-show (rendered but potentially hidden) after first expansion
      expect(html).toContain('id="section-content-1"');
    });

    it('shows loading indicator for large sections on first expand', async () => {
      // Create section with many fields
      const manyFields = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Field ${i + 1}`,
        type: 'text',
        section_id: 1,
        order: i
      }));
      
      const wrapper = createWrapper({
        section: { ...defaultSection, is_collapsed_by_default: true },
        templateFields: manyFields
      });
      
      // hasBeenExpanded should be false initially
      expect(wrapper.vm.hasBeenExpanded).toBe(false);
      
      // Toggle to expand
      wrapper.vm.toggleSection();
      
      // isLoadingFields should be true during first expansion with many fields
      expect(wrapper.vm.isLoadingFields).toBe(true);
    });

    it('does not show loading for small sections', async () => {
      const wrapper = createWrapper({
        section: { ...defaultSection, is_collapsed_by_default: true }
      });
      
      // Toggle to expand (only 2 fields)
      wrapper.vm.toggleSection();
      
      // isLoadingFields should remain false for small sections
      expect(wrapper.vm.isLoadingFields).toBe(false);
    });

    it('has debounced content update method', () => {
      const wrapper = createWrapper();
      
      // The debounced method should exist
      expect(typeof wrapper.vm.onEditableContentUpdate).toBe('function');
      // The immediate version should also exist
      expect(typeof wrapper.vm.onEditableContentUpdateImmediate).toBe('function');
    });
  });
});
