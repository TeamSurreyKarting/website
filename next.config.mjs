/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    images: {
        domains: ['dummyimage.com'],
    },
    // experimental: {
    //     ppr: 'incremental',
    // }
};

export default nextConfig;
