// lint-staged.config.js
module.exports = {
  '*.{js,ts,json,md}': ['prettier --write', 'git add'],
};
