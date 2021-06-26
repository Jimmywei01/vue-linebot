const path = require('path')

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    open: true,
    host: 'localhost',
    port: '8082',
    proxy: {
      '/api': {
        // target: 'http://localhost:9508/',
        // target: 'http://88dac91121c5.ngrok.io/',
        target: 'https://linbot-jimmy.herokuapp.com/',
        changeOrigin: true
      }
    }
  }
}
