// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: { unoptimized: true }
// };

// module.exports = nextConfig;

import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  reactStrictMode: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
