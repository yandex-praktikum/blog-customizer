import type { StorybookConfig } from '@storybook/react-webpack5';
const path = require('path');

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions',
		'@storybook/addon-styling-webpack',
		{
			name: '@storybook/addon-styling-webpack',

			options: {
				rules: [
					{
						test: /\.css$/,
						sideEffects: true,
						use: [
							require.resolve('style-loader'),
							{
								loader: require.resolve('css-loader'),
								options: {
									// Want to add more CSS Modules options? Read more here: https://github.com/webpack-contrib/css-loader#modules
									modules: {
										auto: true,
									},
								},
							},
						],
					},
					{
						test: /\.s[ac]ss$/,
						sideEffects: true,
						use: [
							require.resolve('style-loader'),
							{
								loader: require.resolve('css-loader'),
								options: {
									// Want to add more CSS Modules options? Read more here: https://github.com/webpack-contrib/css-loader#modules
									modules: {
										auto: true,
									},
									importLoaders: 2,
								},
							},
							require.resolve('resolve-url-loader'),
							{
								loader: require.resolve('sass-loader'),
								options: {
									// Want to add more Sass options? Read more here: https://webpack.js.org/loaders/sass-loader/#options
									implementation: require.resolve('sass'),
									sourceMap: true,
									sassOptions: {},
								},
							},
						],
					},
				],
			},
		},
	],
	webpackFinal: async (config) => {
		if (config?.resolve?.alias) {
			config.resolve.alias = {
				fonts: path.resolve(__dirname, '..', './src/fonts'),
				src: path.resolve(__dirname, '..', './src'),
				components: path.resolve(__dirname, '..', './src/components'),
			};
		}

		return config;
	},
	framework: {
		name: '@storybook/react-webpack5',
		options: {
			builder: {
				useSWC: true,
			},
		},
	},
	swc: () => ({
		jsc: {
			transform: {
				react: {
					runtime: 'automatic',
				},
			},
		},
	}),
	docs: {
		autodocs: 'tag',
	},
};
export default config;
