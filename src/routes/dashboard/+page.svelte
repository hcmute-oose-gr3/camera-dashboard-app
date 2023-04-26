<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { PageData } from './$types';
	import DashboardCard from './DashboardCard.svelte';
	import { quadIn } from 'svelte/easing';

	export let data: PageData;
</script>

<div
	out:scale={{ start: 0.98, duration: 400, easing: quadIn }}
	class="grid grid-cols-3 gap-12 mx-auto p-16 min-h-screen min-w-screen"
>
	{#each data.dashboards as dashboard}
		<DashboardCard data={dashboard} />
	{/each}
</div>
