<script lang="ts">
	import { backIn, backOut } from 'svelte/easing';
	import NavigationBar from '~/routes/dashboard/(dashboard)/[id=objectId]/components/NavigationBar.svelte';
	import type { NavigationItemData } from '~/routes/dashboard/(dashboard)/[id=objectId]/components';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import { fly } from 'svelte/transition';
	import { quadIn, quadOut } from 'svelte/easing';
	import LL from '~/i18n/i18n-svelte';
	export let data: LayoutData;
	const items = [
		{
			text: $LL.dashboard.area.layout.home(),
			href: `/dashboard/${$page.params.id}/area`,
		},
		{
			text: $LL.dashboard.area.layout.add(),
			href: `/dashboard/${$page.params.id}/area/modal`,
		},
	] satisfies NavigationItemData[];

	let delta = 1;
	let lastIndex = -1;
	$: {
		const index = items.findIndex((i) => i.href === data.url.pathname);
		delta = index > lastIndex ? 1 : -1;
		lastIndex = index;
	}
</script>

<NavigationBar {items} />
{#key data.url.pathname.split('/', 6).slice(4, -1).join('/')}
	<div
		in:scale|local={{ start: 0.99, duration: 400, delay: 100, easing: backOut }}
		out:scale|local={{ start: 1.01, duration: 100, easing: backIn }}
	>
		<slot />
	</div>
{/key}
