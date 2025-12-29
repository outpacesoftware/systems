import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				// Rewrite /docs/components/button.md to /docs/components/button/markdown
				source: "/docs/components/:slug.md",
				destination: "/docs/components/:slug/markdown",
			},
		];
	},
};

export default nextConfig;
