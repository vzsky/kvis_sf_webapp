import page404 from './views/404.svelte';
import pageHome from './views/home.svelte';
import pageAdminHome from './views/admin/home.svelte';

const routes = {
	'/': pageHome,
	'/admin': pageAdminHome,
	'*': page404,
}

export {
	routes,
};