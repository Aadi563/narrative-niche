/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.output.globalObject = "self";
    return config;
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
