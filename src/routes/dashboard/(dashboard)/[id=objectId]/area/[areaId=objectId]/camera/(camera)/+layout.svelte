<script lang="ts">
	import NavigationBar from '~/routes/dashboard/(dashboard)/[id=objectId]/components/NavigationBar.svelte';
	import type { NavigationItemData } from '~/routes/dashboard/(dashboard)/[id=objectId]/components';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { backIn, backOut } from 'svelte/easing';
	import LL from '~/i18n/i18n-svelte';
	import { meta } from '~/routes';

	export let data: LayoutData;
	const items = [
		{
			text: $LL.camera.navigation.viewCameras(),
			href: `/dashboard/${$page.params.id}/area/${$page.params.areaId}/camera`,
		},
		{
			text: $LL.camera.navigation.newCamera(),
			href: `/dashboard/${$page.params.id}/area/${$page.params.areaId}/camera/add`,
		},
	] satisfies NavigationItemData[];

	let delta = 1;
	let lastIndex = -1;
	$: {
		const index = items.findIndex((i) => i.href === data.url.pathname);
		delta = index > lastIndex ? 1 : -1;
		lastIndex = index;
	}

	$meta.title = $LL.dashboard.area.meta.namedTitle({ areaName: data.areaName });
</script>

<NavigationBar {items} />
{#key data.url}
	<div
		class="mt-4"
		in:fly|local={{ x: -6 * delta, duration: 400, delay: 100, easing: backOut }}
		out:fly|local={{ opacity: 1, x: 4 * delta, duration: 100, easing: backIn }}
	>
		<slot />
	</div>
{/key}
