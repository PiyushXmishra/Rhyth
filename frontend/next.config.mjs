import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
		dest: "public",
		register: true,
        disable: process.env.NODE_ENV === 'development',
		skipWaiting: true,

})({
  images: {
    domains: ['i9.ytimg.com', 'ytimg.com', 'i.ytimg.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.ytimg.com',
        port: '',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
},
});

export default nextConfig;
