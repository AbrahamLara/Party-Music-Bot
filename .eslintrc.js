let { OS } = require('./config.json');

module.require = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['prettier', 'airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  // Keep these rules in alphabetical order.,
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'function-paren-newline': 'off',
    'global-require': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/first': 'off',
    'import/no-dynamic-require': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', 120],
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'operator-linebreak': 'off',
    'linebreak-style': ['error', OS],
  },
};
