module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true,
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-cond-assign': ['error', 'always'],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
