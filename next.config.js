/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'qa-ev-esp.plathanus.com.br',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'stg-ev-esp.plathanus.com.br',
        pathname: '**'
      }
    ]
  }
};

module.exports = nextConfig;
