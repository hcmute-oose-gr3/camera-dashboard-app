<script lang="ts">
	import '~/app.css';
	import NavigationProgressBar from '~/lib/components/NavigationProgressBar.svelte';
	import { meta } from '~/routes';
</script>

<svelte:head>
	<title>{$meta.title}</title>
</svelte:head>

<slot />
<NavigationProgressBar />
