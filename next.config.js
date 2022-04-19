/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: "custom"
    },
    env: {
        NEXT_PUBLIC_SERVER_BASE_URL: 'https://jsonplaceholder.typicode.com/'
    },
    trailingSlash: true
}

module.exports = nextConfig