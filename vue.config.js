module.exports = {
    devServer: {
        port: 8082,
        proxy: {
            '^/api': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true
            }
        }
    }
}
