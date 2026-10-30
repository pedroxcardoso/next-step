import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain site to /out (GitHub Pages, Netlify, Vercel...).
// For GitHub Pages under a sub-path, set NEXT_PUBLIC_BASE_PATH=/nome-do-repo before building.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
