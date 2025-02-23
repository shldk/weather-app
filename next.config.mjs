import { codeInspectorPlugin } from "code-inspector-plugin";

let userConfig = {
	webpack: (config, { dev, isServer }) => {
		config.plugins.push(
			codeInspectorPlugin({
				bundler: "webpack",
				dev: true,
				hotKeys: ["metaKey", "shiftKey"],
			})
		);
		return config;
	},
	images: {
		remotePatterns: [
		  {
			protocol: 'http',
			hostname: 'openweathermap.org',
			port: '',
			pathname: '/img/wn/**',
			search: '',
		  },
		],
	  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		webpackBuildWorker: true,
		parallelServerBuildTraces: true,
		parallelServerCompiles: true,
	}
};

mergeConfig(nextConfig, userConfig);

function mergeConfig(nextConfig, userConfig) {
	if (!userConfig) {
		return;
	}

	for (const key in userConfig) {
		if (
			typeof nextConfig[key] === "object" &&
			!Array.isArray(nextConfig[key])
		) {
			nextConfig[key] = {
				...nextConfig[key],
				...userConfig[key],
			};
		} else {
			nextConfig[key] = userConfig[key];
		}
	}
}

export default nextConfig;
