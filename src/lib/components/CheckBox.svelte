<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let checked = false;
</script>

<input
	type="checkbox"
	on:pointerdown
	on:input
	bind:checked
	{...$$restProps}
	class={twMerge(
		'form-checkbox text-primary-700 focus:ring-primary-500 bg-fill-100 transition rounded focus:ring-offset-1 focus:ring',
		$$restProps.class
	)}
/>
