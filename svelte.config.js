const production = !process.env.ROLLUP_WATCH;

export default {
	dev: !production,
	css: css => {
		css.write('public/bundle.css');
	}
};