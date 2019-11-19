module.exports = {
  'extends': [
    'airbnb-base'
  ],
  'rules': {
    'semi': ['error'],
    'space-before-function-paren': ['error', 'always'],
    'import/prefer-default-export': 'off',
    "arrow-body-style": 'off',
    'no-underscore-dangle': 'warn'
  },
  'env': {
    'node': true,
    'es6': true
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'codeFrame': false,
    'ecmaFeatures': {
      'modules': true,
      'experimentalObjectRestSpread': true
    }
  },
  'plugins': [
    'babel',
    'import'
  ],
  'settings': {
    'import/resolver': {
      'babel-module': {}
    }
  }
};
