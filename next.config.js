/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        '127.0.0.1:3000',
        '127.0.0.1:3005',
        'localhost:3000', // localhost
        'localhost:3005',
        'https://optimalscripts.com', // Codespaces
        'https://admin.optimalscripts.com',
	      'https://app.gomydocs.com'
      ],
    },
  },
};

module.exports = nextConfig;
