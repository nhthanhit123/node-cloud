import type { NextConfig } from "next";

// Allowlist for dev origins (to avoid cross-origin dev warnings when
// accessing the dev server via a LAN IP). Applied only in development.
const dev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  allowedDevOrigins: dev ? [
    'http://192.168.1.155:3000',
    'http://localhost:3000'
  ] : [],
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用 Next.js 热重载，由 nodemon 处理重编译
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      // 禁用 webpack 的热模块替换
      config.watchOptions = {
        ignored: ['**/*'], // 忽略所有文件变化
      };
    }
    return config;
  },
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
