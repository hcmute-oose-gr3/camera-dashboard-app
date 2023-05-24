<script lang="ts">
	import { page } from '$app/stores';
	import { Motion } from 'svelte-motion';
	import type { NavigationItemData } from '.';
	import { motionTransition } from '~/routes/dashboard/(dashboard)/components';

	export let data: NavigationItemData;

	let active = false;
	$: active = $page.url.pathname.endsWith(data.href);
</script>

<li
	class="relative rounded-lg transition-colors duration-[50ms] font-medium border border-transparent
		{active
		? 'text-fill-1000'
		: 'hover:border-fill-300 text-fill-400 hover:text-fill-700 bg-transparent'}"
>
	<a href={data.href} class="block py-1.5 px-2 w-full h-full">
		{data.text}
	</a>
	{#if active}
		<Motion let:motion layoutId="outline" initial={false} transition={motionTransition}>
			<div use:motion class="absolute inset-0 rounded-lg border border-fill-300 -z-50" />
		</Motion>
	{/if}
</li>
