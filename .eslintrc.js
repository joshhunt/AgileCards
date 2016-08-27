module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    rules: {
        "import/no-unresolved": "off",
        "react/prop-types": "off",
        "no-prototype-builtins": "off",
        "react/jsx-filename-extension": "off",
        "max-len": "off",
        "no-return-assign": "off",
    }
};