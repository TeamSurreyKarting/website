/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "build",
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dummyimage.com'
            }
        ]
    },
    // experimental: {
    //     ppr: 'incremental',
    // }
};

export default nextConfig;
