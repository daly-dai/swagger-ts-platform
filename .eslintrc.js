module.exports = {
  rules: {
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
  },
  parserOptions: {
    allowImportExportEverywhere: true, // 不限制eslint对import使用位置
  },
  extends: require.resolve('@umijs/max/eslint'),
};
