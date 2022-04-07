module.exports = {
  root: true,
  extends: [
    'prettier',
    'plugin:react/recommended',
    'plugin:react-native/all',
    '@react-native-community',
    'standard',
  ],
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    // disabling some rules to suit my code style
    semi: 0,
    'comma-dangle': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'react-native/sort-styles': 0,
    'react-hooks/exhaustive-deps': 0,
    'multiline-ternary': 0,
    'react-native/no-raw-text': 0,
  },
}
