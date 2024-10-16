import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: 'public',  // Folder where the service worker and other PWA files will be generated
  // disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
})({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
      },
    ],
  },
});

export default nextConfig;
