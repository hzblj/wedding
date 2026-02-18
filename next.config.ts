import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL('https://picsum.photos/**'),
            new URL('https://hmhwnelhxbrgxirdlrzc.supabase.co/**')
        ],
    },
    experimental: {
        viewTransition: true,
    },
};

export default nextConfig;
