/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [process.env.NEXT_PUBLIC_IMAGE_URL],
    domains: [
      "staging.api.kouakoudomagni.com",
      "www.staging.api.kouakoudomagni.com",
      "api.kouakoudomagni.com",
      "www.api.kouakoudomagni.com",
    ],
  },
};

module.exports = nextConfig;
