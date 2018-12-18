module.exports = {
    extends: [
        '@fiverr/eslint-config-fiverr/rules/base.js',
        '@fiverr/eslint-config-fiverr/rules/es6.js'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true
        }
    },
    env: {
        node: true,
        es6: true
    },
    rules: {
        'no-console': 0
    },
    overrides: [
        {
            files: [
                '**/spec.js',
            ],
            env: {
                jest: true
            },
            rules: {
              "no-empty-function": 0
            }
        }
    ],
};
