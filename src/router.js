import page404 from './old_views/404.svelte';
import pageAdminHome from './old_views/admin/home.svelte';

import pageSchedule from './views/schedule.svelte'
import pageAnnc from './views/announcement.svelte'
import pageHome from './views/home.svelte'

const routes = {
	'/': pageHome,
	'/admin': pageAdminHome,
	'/schedule' : pageSchedule,
	'/announce' : pageAnnc,

	'*': page404,
}

export {
	routes,
};