import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
    target: process.env.BACKEND_PROXY_URL || "http://localhost:8081",
    changeOrigin: false,
    xfwd: true,
});

export const config = {
    api: {
        bodyParser: false, // enable POST requests
        externalResolver: true, // hide warning message
    },
};
