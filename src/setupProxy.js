const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://3xib1i17uh.execute-api.us-east-2.amazonaws.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/default/suggestQuestion",
      },
    })
  );
};
