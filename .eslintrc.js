module.exports = {
  env: {
    es2020: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'prettier'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  ignorePatterns: ['.eslintrc.js', 'build/'],
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-console': 'warn',
    'no-eval': 'error',
    'react/no-danger': 'error',
    'react/prefer-es6-class': 'warn',
    'react/jsx-pascal-case': 'error',
    'brace-style': ['error', '1tbs'],
    eqeqeq: ['warn', 'always', { null: 'ignore' }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      env: {
        jest: true,
      },
      globals: {
        React: "writable",
      },
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
          typescript: {
            project: "./tsconfig.json",
          },
        },
      },
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
      },
      plugins: ["jsx-a11y"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:react-hooks/recommended",
        "prettier",
      ],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": [0],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-console': 'warn',
        'no-eval': 'error',
        'react/no-danger': 'error',
        'react/prefer-es6-class': 'warn',
        'react/jsx-pascal-case': 'error',
        'brace-style': ['error', '1tbs'],
        eqeqeq: ['warn', 'always', { null: 'ignore' }],
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            "ts-ignore": "allow-with-description",
            minimumDescriptionLength: 4,
          },
        ],
      },
    },
  ],
};
