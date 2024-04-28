/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image1.mobiauto.com.br',
        port: '',
      },
    ],
  },
}

export default nextConfig
