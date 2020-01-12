import page404 from './old_views/404.svelte';
import pageAdminHome from './old_views/admin/home.svelte';

import pageHome from './views/home.svelte'

const routes = {
	'/': pageHome,
	'/admin': pageAdminHome,

	'*': page404,
}

export {
	routes,
};