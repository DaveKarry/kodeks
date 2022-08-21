module.exports = {
  'env': {
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module'
  },
  'rules': {
    'indent': ['error', 2],
    'no-multi-spaces': ['error'],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0 }],
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }]
  }
};