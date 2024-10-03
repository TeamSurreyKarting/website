/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
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
