// tests/js/mocks/tinymce.js
const tinymce = {
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
};

module.exports = tinymce;