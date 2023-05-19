<script lang="ts">
	import '~/app.css';
	import NavigationProgressBar from '~/lib/components/NavigationProgressBar.svelte';
	import type { PageMeta } from '.';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	const meta = writable<PageMeta>({ title: '' });
	setContext('meta', meta);
	$: ({ title } = $meta);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<slot />
<NavigationProgressBar />
