const expoFlat = require('eslint-config-expo/flat');

module.exports = [
  ...expoFlat,
  {
    ignores: ['node_modules/', '.expo/', 'dist/', '.git/'],
  },
];