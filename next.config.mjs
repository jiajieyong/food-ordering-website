/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/queue-numbers",
                destination: "http://localhost:8080/queue-numbers"
            },
            {
                source: "/order",
                destination: "http://localhost:8080/order"
            }
        ]
    },
    reactStrictMode: false,
};

export default nextConfig;
