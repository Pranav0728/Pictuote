/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://zenquotes.io/api/quotes/:path*',
      },
    ];
  },
};

export default nextConfig;
