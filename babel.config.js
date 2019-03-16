const presets = [
  "@babel/env",
  "@babel/preset-react"
];

const plugins = [
  "@babel/plugin-proposal-class-properties"
]

const overrides = [
  {
    test: ["packages/core", "packages/toolbar-antd"],
    plugins: [
      ["module-resolver", {
        "alias": { "~": "./src/scripts" }
      }]
    ]
  },
  {
    test: ["packages/toolbar-antd"],
    plugins: [
      ["import", {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css"
      }]
    ]
  }
]

module.exports = {
  presets,
  plugins,
  overrides
};
