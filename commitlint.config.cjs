module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-min-length': [2, 'always', 10]
  }
}
