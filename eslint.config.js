import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    ignores: ['**/*.config.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        console: 'readonly',
      },
    },

    rules: {
      // Your custom rules here
      // For example:
      // 'no-console': 'warn',
      // curly: 'error',
      eqeqeq: 'error',
      'no-var': 'warn',
      'no-unused-vars': 'warn',
    },
  },
  pluginJs.configs.recommended,
];
