import page404 from './views/404.svelte';
import pageHome from './views/home.svelte';
import pageAdminHome from './views/admin/home.svelte';
import pageAdminSchedule from './views/admin/schedule.svelte';

const routes = {
	'/': pageHome,
	'/admin': pageAdminHome,
	'/admin/schedule': pageAdminSchedule,
	'*': page404,
}

export {
	routes,
};