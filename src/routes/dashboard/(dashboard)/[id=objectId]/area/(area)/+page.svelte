<script lang="ts">
	import Icon from '~/lib/components/Icon.svelte';
	import Modal from './modal/+page.svelte';
	import type { PageData } from './$types';
	import LL from '~/i18n/i18n-svelte';
	import { invalidate } from '$app/navigation';
	import Table from './components/Table.svelte';
	import { getContext } from 'svelte';
	import type { WritablePageMeta } from '~/routes';

	export let data: PageData;

	const meta = getContext('meta') as WritablePageMeta;
	let showModal = false;
	let checked = Array(data.areas.length).fill(false);

	function submit() {
		invalidate('abc');
	}

	$: $meta.title = $LL.dashboard.area.meta.title();
</script>

<Table areas={data.areas} bind:checked />
