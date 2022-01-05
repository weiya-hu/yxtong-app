const { createProxyMiddleware } = require('http-proxy-middleware')
export default (app)=>{
    app.use("/api",
        createProxyMiddleware({
            target: 'http://47.108.185.157:9000',
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        })
    )
}

