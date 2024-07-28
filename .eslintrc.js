module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Add this to use Prettier with ESLint
    'prettier', // Add this to turn off ESLint rules that might conflict with Prettier
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier', // Add this to include the Prettier plugin
  ],
  rules: {
    'prettier/prettier': 'error', // Enable Prettier formatting errors
    'react/react-in-jsx-scope': 'off',
  },
};
