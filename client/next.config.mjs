/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: process.env.NEXT_PUBLIC_BASE_URL
					? `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`
					: 'http://localhost:8000/:path*',
			},
		];
	},
};

export default nextConfig;
