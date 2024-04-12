/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com'
      },
      {
        hostname: 'link-list-0468.s3.amazonaws.com',
      },
    ],
  }
}

module.exports = nextConfig
