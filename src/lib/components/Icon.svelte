<script lang="ts">
	import { SvelteComponent, onMount } from 'svelte';
	import type { IconName } from 'svelted-heroicons';
	export let name: IconName;

	let promise: Promise<typeof SvelteComponent>;
	onMount(() => {
		promise = import(`../../../node_modules/svelted-heroicons/dist/solid/${name}.svelte`).then(
			(v) => v.default
		);
	});
</script>

{#await promise then component}
	<svelte:component this={component} class={$$restProps.class} />
{/await}
