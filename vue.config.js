const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  devServer: {
    host: "localhost",
    port: 3000,
    client: {
      overlay: false,
    },
  },
  transpileDependencies: true
})
