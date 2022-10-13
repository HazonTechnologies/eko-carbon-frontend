/* eslint-disable eol-last */
/* eslint-disable indent */
/** @type {import('next').NextConfig} */

const devIP = `http://34.229.201.188`;
const version = 1;
const nextConfig = {
    reactStrictMode: false,
    images: {
        loader: "custom",
    },
    env: {
        NEXT_PUBLIC_SERVER_BASE_URL: `${devIP}/api/v${version}/`,
    },
    trailingSlash: true,
};


module.exports = nextConfig;
