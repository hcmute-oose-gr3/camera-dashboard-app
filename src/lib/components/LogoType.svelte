<script lang="ts">
	import LL from '~/i18n/i18n-svelte';
	import Logo from './Logo.svelte';

	export let fill: string;
</script>

<div class="flex items-center justify-center gap-x-4 text-primary-700 {$$restProps.class}">
	<Logo class={fill} />
	<h1 class="flex flex-col items-end uppercase">
		{#each $LL.logo.name().split(' ') as word}
			<span>{word}</span>
		{/each}
	</h1>
</div>
