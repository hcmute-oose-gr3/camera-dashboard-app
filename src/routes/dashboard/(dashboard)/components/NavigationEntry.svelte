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
		class="rounded-md transition-colors duration-[50ms] w-full font-medium
		{active
			? 'text-primary-700'
			: 'hover:bg-fill-200 text-fill-1000 hover:text-primary-700 bg-transparent'}"
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
				class="transition ease-in-out -translate-x-1 opacity-0 border-2 bg-fill-100 border-fill-200 n w-max rounded-l-none text-fill-1000 px-2 py-1 rounded absolute text-xs left-full ml-3
				lg:peer-hover:opacity-0 peer-hover:translate-x-0 peer-hover:opacity-100"
			>
				{data.text}
			</div>
			<span class="z-50 hidden lg:inline">
				{data.text}
			</span>
			{#if active}
				<Motion let:motion layoutId="outline" initial={false} transition={motionTransition}>
					<div use:motion class="absolute inset-0 rounded-lg bg-fill-200" />
				</Motion>
			{/if}
		</a>
	</li>
</div>
