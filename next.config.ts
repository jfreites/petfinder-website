import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    // domains: [
    //   "eniyiavrjwjxnebpuvzh.supabase.co",
    //   "placehold.co",
    //   "pb.dp.ungravity.dev"
    // ],
    remotePatterns: [
      { hostname: "eniyiavrjwjxnebpuvzh.supabase.co" },
      { hostname: "placehold.co" },
      { hostname: "pocketbase.dp.ungravity.dev" },
    ],
  }
};

export default nextConfig;
