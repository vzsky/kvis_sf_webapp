import page404 from './views/404.svelte';
import pageHome from './views/Home.svelte';
import pageSchedule from './views/Schedule.svelte';

const routes = {
	'/': pageHome,
	'/schedule': pageSchedule,
	'*': page404,
}

export {
	routes,
};