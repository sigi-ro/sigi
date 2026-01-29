module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended', // Vue 2 recommended rules
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2021,
        sourceType: 'module',
        requireConfigFile: false,
    },
    plugins: ['vue'],
    globals: {
        // Laravel/Inertia globals
        axios: 'readonly',
        route: 'readonly',
        _: 'readonly', // lodash
        $: 'readonly', // jQuery if used
    },
    rules: {
        // Vue-specific rules
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, { baseIndent: 1 }],
        'vue/max-attributes-per-line': ['warn', {
            singleline: { max: 3 },
            multiline: { max: 1 },
        }],
        'vue/html-self-closing': ['error', {
            html: { void: 'always', normal: 'never', component: 'always' },
        }],
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/no-v-html': 'warn', // Security warning for v-html
        'vue/require-default-prop': 'warn',
        'vue/require-prop-types': 'warn',
        
        // General JS rules - relaxed for existing codebase
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'prefer-const': 'warn',
        'no-var': 'warn',
        'eqeqeq': ['warn', 'smart'],
        
        // Disabled rules to avoid too many errors on existing code
        'vue/multi-word-component-names': 'off', // Many single-word components exist
        'vue/no-mutating-props': 'warn', // Common pattern, warn only
        'vue/attribute-hyphenation': 'off',
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off', // Use vue/script-indent instead
            },
        },
    ],
    ignorePatterns: [
        'node_modules/',
        'public/',
        'vendor/',
        'storage/',
        '*.min.js',
        'resources/js/vendor/',
    ],
};
