<script lang="ts">
	import type { IconName } from 'svelted-heroicons';
	import Icon from './Icon.svelte';
	import { twMerge } from 'tailwind-merge';

	export let icon: IconName;
	export let iconClass: string = '';
	export let text: string;
	export let textClass: string = '';
</script>

<div class="flex">
	<span class={twMerge('p-2 bg-positive-500 block text-fill-100 rounded-l-md', iconClass)}>
		<Icon name={icon} class="h-full" />
	</span>
	<p class={twMerge('px-2 bg-positive-200 rounded-r-md flex items-center', textClass)}>
		{text}
	</p>
</div>
