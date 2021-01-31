const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  webpackFinal: async (config) => {
    config.plugins = [
      ...(config?.plugins || []),
      new MonacoWebpackPlugin({
        languages: ["json", "yaml", "markdown"],
      }),
    ]
    return config
  },
}
