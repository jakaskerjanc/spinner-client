module.exports = {
    root: true,
    env: {
        es2020: true,
        node: true
    },
    extends: [
        'standard',
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        'plugin:vue/vue3-recommended'
    ],
    rules: {
        'vue/multi-word-component-names': 'off',
        indent: ['error', 4]
    }
}
