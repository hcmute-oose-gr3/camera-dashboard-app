<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { PageData } from './$types';
	import Card from './components/Card.svelte';
	import { quadIn } from 'svelte/easing';
	import LL from '~/i18n/i18n-svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import { meta } from '~/routes';

	export let data: PageData;

	$meta.title = $LL.dashboard.meta.title();
</script>

<p class="mt-1 font-body font-medium">{$LL.dashboard.action()}</p>
<div
	out:scale={{ start: 0.98, duration: 400, easing: quadIn }}
	class="mt-8 grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
>
	{#each data.dashboards as dashboard (dashboard._id)}
		<Card data={dashboard} />
	{/each}
	<a
		href="/dashboard/add"
		class="group flex text-left font-normal border-dashed border border-fill-300 p-6 rounded-xl transition duration-100 ease-in-out
		hover:translate-y-1 w-max hover:scale-105"
	>
		<Icon
			name="SquaresPlus"
			class="w-20 h-20 m-auto text-primary-700 transition ease-in-out duration-200
			group-hover:scale-110 group-hover:drop-shadow-xl"
		/>
	</a>
</div>
