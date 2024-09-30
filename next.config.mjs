/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: ['dummyimage.com'],
    },
    // experimental: {
    //     ppr: 'incremental',
    // }
};

export default nextConfig;
