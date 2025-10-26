/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    qualities: [75, 90],
    remotePatterns: [],
  },
}

module.exports = nextConfig
