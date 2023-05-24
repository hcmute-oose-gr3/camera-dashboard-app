<script lang="ts">
	import { Motion } from 'svelte-motion';
	import type { NavigationItemData } from '.';
	import { motionTransition } from '../../components';
	import { page } from '$app/stores';

	export let item: NavigationItemData;
	let active = false;

	$: active = Array.isArray(item.href)
		? item.href.some((v) => v === $page.url.pathname)
		: $page.url.pathname === item.href;
</script>

<li class="relative">
	<a
		href={Array.isArray(item.href) ? item.href[0] : item.href}
		class="transition-colors {active ? 'text-primary-700' : ''}"
	>
		{item.text}
	</a>
	{#if active}
		<Motion let:motion layoutId="navigation-item" initial={false} transition={motionTransition}>
			<div use:motion class="absolute inset-0 border-b-2 border-b-primary-700 z-50" />
		</Motion>
	{/if}
</li>
