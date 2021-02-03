const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = (config) => {
  config.target = "web"

  config.plugins = [
    ...config.plugins,
    new MonacoWebpackPlugin({
      languages: ["json", "yaml", "markdown"],
    }),
    new CopyPlugin({
      patterns: [
        { from: "node_modules/@uifabric/icons/fonts/*", to: "static/media", flatten: true },
      ],
    }),
  ]
  return config
}
