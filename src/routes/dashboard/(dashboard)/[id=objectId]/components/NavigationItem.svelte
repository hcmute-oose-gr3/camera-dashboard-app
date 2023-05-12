<script lang="ts">
	import { Motion } from 'svelte-motion';
	import type { NavigationItemData } from '.';
	import { motionTransition } from '../../components';
	import { page } from '$app/stores';

	export let item: NavigationItemData;
	let active = false;

	$: active = item.href === $page.url.pathname;
</script>

<li class="relative">
	<a href={item.href} class="transition-colors {active ? 'text-primary-700' : ''}">
		{item.text}
	</a>
	{#if active}
		<Motion let:motion layoutId="navigation-item" initial={false} transition={motionTransition}>
			<div use:motion class="absolute inset-0 border-b border-b-primary-700 -z-50" />
		</Motion>
	{/if}
</li>
