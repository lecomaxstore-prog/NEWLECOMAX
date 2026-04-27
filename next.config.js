/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // generate static HTML/CSS/JS in ./out
  trailingSlash: true,       // each page becomes index.html in its folder
  images: {
    unoptimized: true,        // required for static export (no image server)
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  devIndicators: false,
};

module.exports = nextConfig;
