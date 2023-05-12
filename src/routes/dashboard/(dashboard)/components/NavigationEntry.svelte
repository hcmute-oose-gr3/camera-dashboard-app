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
	let open = false;
	$: active = $page.url.pathname.split('/', 4).join('/').endsWith(data.href);
</script>

<div>
	<li
		class="relative rounded-md transition-colors duration-[50ms] w-full font-medium
		{active
			? 'text-primary-700'
			: 'hover:bg-fill-200 text-fill-1000 hover:text-primary-700 bg-transparent'}"
	>
		<a
			data-sveltekit-preload-data="tap"
			on:click={onClick}
			href={data.href}
			class="peer py-1.5 px-2 flex items-center gap-x-2
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
		</a>
		{#if active}
			<Motion let:motion layoutId="outline" initial={false} transition={motionTransition}>
				<div use:motion class="absolute inset-0 rounded-lg bg-fill-200" />
			</Motion>
		{/if}
		{#if data.children}
			<button
				type="button"
				class="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-fill-300 p-0.5"
				on:click={(e) => {
					open = !open;
				}}
			>
				<Icon
					name="ChevronLeft"
					class="transition-transform duration-500 w-5 h-5 {open ? '-rotate-90' : ''}"
				/>
			</button>
		{/if}
		<div
			class="pointer-events-none absolute transition ease-in-out -translate-x-1 opacity-0 border-2 bg-fill-100 border-fill-200
		w-max rounded-l-none text-fill-1000 px-2 py-1 rounded text-xs left-full ml-3 top-1/2 -translate-y-1/2
		lg:peer-hover:opacity-0 peer-hover:translate-x-0 peer-hover:opacity-100"
		>
			{data.text}
		</div>
	</li>
	{#if data.children}
		<div
			class="grid overflow-hidden duration-500 ease-in-out transition-[grid-template-rows transform opacity] {open
				? 'grid-rows-[1fr]'
				: 'grid-rows-[0fr] translate-y-1/2 opacity-0'}"
		>
			{#each data.children as child}
				<li class="mt-2 ml-2 {open ? '' : 'overflow-hidden'}">
					<svelte:self data={child} />
				</li>
			{/each}
		</div>
	{/if}
</div>
