<script lang="ts">
	export let accent: 'positive' | 'negative' | undefined = undefined;
	export let label: string | undefined = undefined;
	export let caption: string | undefined = undefined;
	export let select: HTMLSelectElement | undefined = undefined;
	export let value: any | undefined = undefined;

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
<select
	bind:this={select}
	bind:value
	{...$$restProps}
	class="form-select px-2 py-3 rounded-md bg-fill-100 border-fill-300 border-[1px]
	ease-in transition
	active:scale-[0.99] active:ring-0 active:ring-offset-0
	focus:border-fill-300 focus:ring focus:ring-offset-1 focus:ring-primary-500
	disabled:text-fill-800 disabled:bg-fill-200 disabled:border-fill-300
	{accent ? `input-${accent}` : ''}"
>
	<slot />
</select>
<div
	class="grid transition-[grid-template-rows opacity] ease-in-out duration-300 {caption
		? 'grid-rows-[1fr]'
		: 'grid-rows-[0fr] opacity-0'}"
>
	<p class="overflow-hidden {accent ? `caption-${accent}` : undefined}">
		{lastCaption}
	</p>
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
		@apply text-negative-700 border-negative-700 placeholder-negative-800/40;
	}

	.input-positive {
		@apply text-positive-700 border-positive-700 placeholder-positive-800/40;
	}
</style>
