const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/google-books',
    createProxyMiddleware({
      target: 'https://www.googleapis.com',
      changeOrigin: true,
      pathRewrite: (path, req) => {
        const originalPath = path.replace('/google-books', '');
        const apiKey = 'AIzaSyBuHqtNBhZwGW6h8ZAUhDm5S04DtsAmdtE'; // Reemplaza esto con tu API Key
        return `${originalPath}&key=${apiKey}`;
      },
    })
  );
};
