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
  experimental: {staleTimes: {dynamic: 0,},},
};

export default nextConfig;
