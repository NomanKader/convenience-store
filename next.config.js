/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          // ... other rewrites
          {
            source: '/api/:path*',
            destination: '/api-handler',
          },
        ];
      },
}

module.exports = nextConfig
