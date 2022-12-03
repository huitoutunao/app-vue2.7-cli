const { defineConfig } = require('@vue/cli-service')

const CompressionWebpackPlugin = require('compression-webpack-plugin')

const IS_PROD = ['production'].includes(process.env.NODE_ENV)
// const IS_DEV = ['development'].includes(process.env.NODE_ENV)

module.exports = defineConfig({
  publicPath: IS_PROD ? './' : process.env.VUE_APP_PUBLIC_PATH,
  transpileDependencies: true,
  lintOnSave: 'error',
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
  configureWebpack: () => {
    const cfg = {}
    if (IS_PROD) {
      cfg.plugins = [
        // 开启 gzip
        new CompressionWebpackPlugin({
          test: /\.(js|css)(\?.*)?$/i,
          filename: '[path][base].gz',
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
      ]
    }
    return cfg
  },
})
