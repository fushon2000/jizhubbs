const {defineConfig} = require('@vue/cli-service')
const path = require('path');
// 以下三个为下载的，不用可以卸载
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        host: "localhost",
        port: 80,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:90', //请求后台gateway网关，由gateway分发接口
                changeOrigin: true, // 允许跨域
                pathRewrite: {
                    '^/api': '' // 重写请求
                }
            }
        }
    },
    publicPath:'/',
    // 以下均为打包插件，首页加载过慢才加的，可能是elementui过大
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@i': path.resolve(__dirname, './src/assets'),
            }
        },
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),

            // 配置compression-webpack-plugin压缩
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 5,
            })
        ]
    }
})
