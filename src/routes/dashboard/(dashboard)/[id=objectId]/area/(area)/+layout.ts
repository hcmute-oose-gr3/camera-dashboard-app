import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import LL from '~/i18n/i18n-svelte';

export const load = (() => {
	return { meta: { title: get(LL).dashboard.area.meta.title() } };
}) satisfies LayoutLoad;
