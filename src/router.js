import page404 from './views/404.svelte';
import pageHome from './views/Home.svelte';
import pageAdminHome from './views/admin/Home.svelte';
import pageAdminSchedule from './views/admin/Schedule.svelte';

const routes = {
	'/': pageHome,
	'/admin': pageAdminHome,
	'/admin/schedule': pageAdminSchedule,
	'*': page404,
}

export {
	routes,
};