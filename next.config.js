/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.IMAGE_DOMAIN,
        pathname: '**'
      }
    ]
  }
};

module.exports = nextConfig;
