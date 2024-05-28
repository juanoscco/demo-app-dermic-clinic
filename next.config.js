/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TOKEN_API_DNI: process.env.TOKEN_API_DNI,
    API_DOCKER_JAVA_REST: process.env.API_DOCKER_JAVA_REST,
    API_MIGO_DNI_REST: process.env.API_MIGO_DNI_REST,
  },
  // output: "export",
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
