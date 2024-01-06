module.exports = {
  lintOnSave: false,
  devServer: {
    hot: true,
    compress: true,
    disableHostCheck: true,
    port: '8080',
    proxy: {
      '/api': {
        // target: 'http://10.11.24.25:8181/dataclean',
        target: 'http://127.0.0.1:8181/dataclean',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/clean': {
        // target: 'http://127.0.0.1:5110',
        target: 'http://43.129.27.190:8000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/clean': '',
        },
      },
      '/weibo': {
        // target: 'http://192.168.43.50:5000/dataclean/',
        target: 'http://43.129.27.190:8666',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/weibo': '',
        },
      },
    },
  },
}
