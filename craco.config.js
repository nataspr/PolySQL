module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5007',
        changeOrigin: true,
      },
    },
    allowedHosts: 'all',
  },
};