<script lang="ts">
	export let accent: 'positive' | 'negative' | undefined = undefined;
	export let label: string | undefined = undefined;
	export let caption: string | undefined = undefined;
	export let input: HTMLInputElement;

	let lastCaption: string | undefined = caption;
	$: if (caption) {
		lastCaption = caption;
	}
</script>

{#if label}
	<label for={$$restProps.id} class={accent ? `label-${accent}` : undefined}>
		{label}
	</label>
{/if}
<input
	bind:this={input}
	{...$$restProps}
	class="px-2 py-2 rounded-md bg-fill-100 border-fill-300 border-[1px]
	ease-in transition
	placeholder:text-fill-300
	active:scale-[0.99] active:ring-0 active:ring-offset-0
	focus:outline-none focus:ring focus:ring-offset-1 focus:ring-primary-500
	{accent ? `input-${accent}` : ''}"
/>
<div
	class="overflow-hidden transition-[max-height opacity transform] duration-300 ease-in-out
		{accent ? `caption-${accent}` : undefined}
		{caption ? 'max-h-[300px] opacity-100' : 'scale-90 max-h-0 opacity-0'}"
>
	{lastCaption}
</div>

<style lang="postcss">
	.label-negative,
	.caption-negative {
		@apply text-negative-700;
	}

	.label-positive,
	.caption-positive {
		@apply text-positive-700;
	}

	.input-negative {
		@apply border-negative-700;
	}

	.input-positive {
		@apply border-positive-700;
	}
</style>
