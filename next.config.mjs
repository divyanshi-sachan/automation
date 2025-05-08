/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ucarecdn.com', 'cdn.uploadcare.com'],
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
