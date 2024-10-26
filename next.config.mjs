/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image1.mobiauto.com.br',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'fastback.fiat.com.br',
        port: '',
      },
    ],
  },
}

export default nextConfig
