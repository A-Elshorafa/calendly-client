/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        pathname: '/img/**',
        hostname: 'tailwindui.com'
      },
      {
        protocol: 'http',
        pathname: '/assets/**',
        hostname: '**.calendly.com'
      }
    ],
  },
}

module.exports = nextConfig
