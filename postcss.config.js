const purgecss = require("@fullhuman/postcss-purgecss")({
	content: ["./src/**/*.svelte", "./public/**/*.html"],
	defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

const cssnano = require('cssnano')({
	preset: ['default', {
		"discardComments": {
			"removeAll": true
		}
	}],
});

module.exports = {
	plugins: [
		require('tailwindcss')('./tailwind.config.js'),
		...((process.env.NODE_ENV === "production") ? [require('autoprefixer'), purgecss, cssnano] : []),
	],
};