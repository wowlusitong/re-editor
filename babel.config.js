const presets = [
  "@babel/env",
  "@babel/preset-react"
];

const plugins = [
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-proposal-export-namespace-from",
  ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ["@babel/plugin-proposal-class-properties", { "loose" : true }]
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
