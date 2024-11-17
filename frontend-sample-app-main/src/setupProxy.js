const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/google-books',
    createProxyMiddleware({
      target: 'https://www.googleapis.com',
      changeOrigin: true,
      pathRewrite: (path, req) => {
        const originalPath = path.replace('/google-books', '');
        const apiKey = 'Api_key';
        return `${originalPath}&key=${apiKey}`;
      },
    })
  );
};
