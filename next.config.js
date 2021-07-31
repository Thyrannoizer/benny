module.exports = {
    images: {
        domains: ['images.ctfassets.net']
    },
    async rewrites() {
        return [
            {
                source: "/:path*",
                destination: "/api/:path*",
            }
        ]
    }
}
