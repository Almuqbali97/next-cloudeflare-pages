/** @type {import('next').NextConfig} */
const nextConfig = {
    // next.config.js

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'musaab-test-bucket.s3.eu-north-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },

}

module.exports = nextConfig
