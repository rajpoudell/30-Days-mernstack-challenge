/** @type {import('next').NextConfig} */
// next.config.js

module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
      react: {
        throwIfNamespace: false, // Allow JSX namespace tags
      },
    },
  };
  
