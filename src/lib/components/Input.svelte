<script lang="ts">
	export let accent: 'positive' | 'negative' | undefined = undefined;
	export let label: string | undefined = undefined;
	export let caption: string | undefined = undefined;
	export let input: HTMLInputElement;
</script>

{#if label}
	<label for={$$restProps.id} class={accent ? `label-${accent}` : undefined}>
		{label}
	</label>
{/if}
<input
	bind:this={input}
	{...$$restProps}
	class={'active:scale-[0.99] active:ring-0 active:ring-offset-0 ease-in' +
		(accent ? `input-${accent}` : '')}
/>
{#if caption}
	<div class={accent ? `caption-${accent}` : undefined}>
		{caption}
	</div>
{/if}

<style lang="postcss">
	.label-negative {
		@apply text-negative-700;
	}

	.label-positive {
		@apply text-positive-700;
	}

	.input-negative {
		@apply border-negative-700;
	}

	.input-positive {
		@apply border-positive-700;
	}

	.caption-negative {
		@apply text-negative-700;
	}

	.caption-positive {
		@apply text-positive-700;
	}
</style>
