const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

module.exports = (config) => {
  config.target = "electron-renderer"

  config.plugins = [
    ...(config?.plugins || []),
    new MonacoWebpackPlugin({
      languages: ["json", "yaml", "markdown"],
    }),
  ]
  return config
}
