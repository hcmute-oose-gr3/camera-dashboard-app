<script lang="ts">
	import { getContext } from 'svelte';
	import type { PageData } from './$types';
	import Video from './components/Video.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { WritablePageMeta } from '..';

	export let data: PageData;
	const meta = getContext('meta') as WritablePageMeta;

	$: $meta.title = $LL.dashboard.meta.title({ dashboardName: data.dashboard?.name ?? '' });
</script>

<div class="grid grid-cols-3 gap-6 w-full">
	{#each data.cameras as camera, i (i)}
		<a
			href="{data.url.pathname}/area/{camera.areaId}/camera"
			class="block hover:scale-[1.03] transition-transform ease-in-out"
		>
			<Video
				src={camera.url}
				type="video/mp4"
				autoplay
				loop
				muted
				oncanplay="this.muted=true"
			/>
		</a>
	{/each}
</div>
