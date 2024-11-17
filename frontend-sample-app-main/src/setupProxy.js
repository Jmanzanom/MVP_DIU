const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/google-books',
    createProxyMiddleware({
      target: 'https://www.googleapis.com',
      changeOrigin: true,
      pathRewrite: (path, req) => {
        const originalPath = path.replace('/google-books', '');
        require('dotenv').config();
        const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
        return `${originalPath}&key=${apiKey}`;
      },
    })
  );
};
