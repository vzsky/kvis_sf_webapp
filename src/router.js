import page404 from './old_views/404.svelte';
// import pageHome from './old_views/home.svelte';
import pageAdminHome from './old_views/admin/home.svelte';

import devPageHome from './views/home.svelte'

const routes = {
	// '/': pageHome,
	'/admin': pageAdminHome,

	'/': devPageHome,

	'*': page404,
}

export {
	routes,
};