/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                // matching all API routes
                source: "/queue-numbers",
                destination: "http://localhost:8080/queue-numbers"
            }
        ]
    },
    reactStrictMode: false,
};

export default nextConfig;
