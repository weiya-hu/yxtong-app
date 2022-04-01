
const { createProxyMiddleware } = require('http-proxy-middleware')


module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://47.108.185.157:9000',
    // target: 'http://10.10.0.123:9000',
    // target: 'http://10.10.0.83:9000',
    // target: 'http://10.10.0.93:9000',
    // target: 'http://10.10.0.59:9000',//杜
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    }
  }))
}


