const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: "localhost",
    port: 80,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', //请求后台接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 重写请求
        }
      }
    }
  }
})
