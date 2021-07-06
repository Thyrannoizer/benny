module.exports = {
    images: {
        domains: ['images.ctfassets.net']
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8081/:path*' // Proxy to Backend
            }
        ]
    }
}
