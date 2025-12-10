// tests/js/setup.js
import { config } from '@vue/test-utils';

// Mock axios
global.axios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

// Mock Inertia
global.Inertia = {
  visit: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
  get: jest.fn(),
  remember: jest.fn(),
  restore: jest.fn(),
  lazy: jest.fn(),
  reactive: jest.fn(),
  ref: jest.fn(),
  computed: jest.fn(),
  watch: jest.fn(),
  onMounted: jest.fn(),
  onUnmounted: jest.fn(),
  nextTick: jest.fn(),
};

// Mock Ziggy (Laravel route helper)
global.route = jest.fn();

// Mock page error methods (from global mixin)
global.getPageErrorMessage = jest.fn(() => '');
global.clearPageErrorMessage = jest.fn();
global.getPageErrorMessageFromArrayField = jest.fn(() => '');

// Mock userCan helper
global.userCan = jest.fn(() => true);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Configure Vue Test Utils
config.mocks = {
  $route: {
    params: {},
    query: {},
    name: 'test-route',
  },
  $page: {
    props: {
      errors: {},
    },
  },
  getPageErrorMessage: jest.fn(() => ''),
  clearPageErrorMessage: jest.fn(),
  getPageErrorMessageFromArrayField: jest.fn(() => ''),
  userCan: jest.fn(() => true),
};