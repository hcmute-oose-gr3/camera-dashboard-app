<script>
	import Icon from './Icon.svelte';
</script>

<button
	on:click={() => {
		globalThis.history?.back();
	}}
	class="group"
>
	<Icon
		name="ArrowLongLeft"
		class="transition ease-in-out
		group-hover:-translate-x-1 hover:text-primary-700
		group-active:scale-75"
	/>
</button>
