/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "172.20.206.30",
                protocol: "http",
                port: "9000",
                pathname: '/dev-bucket/**',
            },
            {
                hostname: "lh3.googleusercontent.com",
                protocol: "https",
                port: "",
            },
        ]
    }
};

export default nextConfig;
