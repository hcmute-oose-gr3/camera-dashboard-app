<script lang="ts">
	import { SvelteComponent, onMount } from 'svelte';
	import type { IconName } from 'svelted-heroicons';
	import { twMerge } from 'tailwind-merge';
	export let name: IconName;

	let promise: Promise<typeof SvelteComponent>;
	onMount(() => {
		promise = import(
			`../../../node_modules/svelted-heroicons/dist/outline/${name}.svelte`
		).then((v) => v.default);
	});
</script>

{#await promise then component}
	<svelte:component
		this={component}
		{...$$restProps}
		class={twMerge('w-6 h-6', $$restProps.class)}
	/>
{/await}
