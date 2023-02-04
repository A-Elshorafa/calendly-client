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
    ],
  },
}

module.exports = nextConfig
