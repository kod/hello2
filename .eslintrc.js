module.exports = {
    "extends": [
        "airbnb",
        "prettier",
        "prettier/react"
    ],
    "parser": "babel-eslint",
    "rules": {
        "prettier/prettier": ["error", {
            "trailingComma": "all",
            "singleQuote": true
        }],
        "brace-style": [
            2
        ],
        "arrow-parens": [
            2,
            "as-needed"
        ],
        "no-param-reassign": 0,
        "no-constant-condition": ["error", { "checkLoops": false }],
        "no-bitwise": ["error", { "allow": ["~"] }],
        "arrow-body-style": ["error", "as-needed"],
        "class-methods-use-this": ["off"],
        "import/no-extraneous-dependencies": [
            2, 
            { 
                "devDependencies": true 
            }
        ],
        "react/jsx-filename-extension": [
            2, 
            { 
                "extensions": [".js"] 
            }
        ],
        "react/prop-types": [
            0
        ],
        "react/sort-comp": [0],
        "react/no-unused-prop-types": [0],
        "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
        "react/forbid-prop-types": [0],
        // windows linebreaks when not in production environment
        "linebreak-style": ["error", "unix"]
    },
    "env": {
        "es6": true,
        "browser": true,
        "jest": true
    },
    "ecmaFeatures": {
        "jsx": true,
        "experimentalObjectRestSpread": true
    },
    "settings": {
        "import/resolver": "react-native"
    },
    "plugins": [
        "react",
        "react-native",
        "prettier",
        "jest"
    ]
};