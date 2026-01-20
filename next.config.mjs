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
      {
        protocol: 'https',
        hostname: 'ntnln8aau1.ufs.sh',
        port: '',
      }
    ],
  },
}

export default nextConfig
