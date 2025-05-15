module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5009',
        changeOrigin: true,
        // bypass: function(req, res, options) {
        //   console.debug("bypass");
        // },
        // onProxyReq: function(proxyReq, req, res) {
        //   console.debug(`Proxying request: ${req.originalUrl} => ${proxyReq.path}`);
        // }
      }
    },
    allowedHosts: 'all'    
  }
};