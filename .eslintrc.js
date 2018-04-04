module.exports = {
  root: true,
  parser: 'babel-eslint',
  "plugins": [
    "react"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "globals": {
    "$": true,
  },
  "extends": "eslint-config-airbnb",
  "rules": {
    "camelcase": 2,
    "curly": 2,
    "brace-style": [2, "1tbs"],
    "quotes": [2, "single"],
    "jsx-quotes": 0,
    "semi": [2, "always"],
    "no-plusplus": 0,
    "func-names": 0,
    "prefer-arrow-callback": 0,
    "class-methods-use-this": "off",
    "react/forbid-prop-types": [1, {"forbid": ["any"]}],
    'jsx-a11y/click-events-have-key-events': 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }]
  }
}
