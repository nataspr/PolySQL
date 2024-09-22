module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5009',
        changeOrigin: true,
      },
    },
    allowedHosts: 'all',
  },
};