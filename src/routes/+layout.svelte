<script lang="ts">
	import '~/app.css';
	import NavigationProgressBar from '~/lib/components/NavigationProgressBar.svelte';
	import { page } from '$app/stores';
</script>

<svelte:head>
	{#if $page.data.meta}
		<title>{$page.data.meta.title}</title>
	{/if}
</svelte:head>

<slot />
<NavigationProgressBar />
