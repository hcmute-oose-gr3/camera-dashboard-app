<script lang="ts">
	import { page } from '$app/stores';
	import { Motion } from 'svelte-motion';
	import { motionTransition, type NavigationEntryData } from '.';
	import Icon from '~/lib/components/Icon.svelte';

	export let data: NavigationEntryData;

	const onClick = (e: MouseEvent) => {
		if (active) {
			e.preventDefault();
		}
	};

	let active = false;

	$: active = $page.url.pathname === data.href;
</script>

<div class="relative">
	<li
		class="rounded-md transition-colors w-full font-medium
		{active ? 'text-fill-100' : 'hover:bg-primary-700 text-primary-400 hover:text-primary-300'}"
	>
		<a
			data-sveltekit-preload-data="tap"
			on:click={onClick}
			href={data.href}
			class="py-1.5 px-2 flex items-center gap-x-2
			{active ? 'cursor-default' : ''}"
		>
			<Icon class="peer z-50" name={data.icon} />
			<div
				class="hidden bg-primary-600 w-max rounded-l-none text-fill-100 px-2 py-1 rounded absolute text-xs left-full ml-3
				peer-hover:block lg:peer-hover:hidden"
			>
				{data.text}
			</div>
			<span class="z-50 hidden lg:inline">
				{data.text}
			</span>
			{#if active}
				<Motion let:motion layoutId="outline" initial={false} transition={motionTransition}>
					<div use:motion class="absolute inset-0 rounded-lg bg-primary-800" />
				</Motion>
			{/if}
		</a>
	</li>
</div>
