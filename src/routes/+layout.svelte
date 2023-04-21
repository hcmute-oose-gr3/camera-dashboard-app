<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import '~/app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	beforeNavigate((nav) => {
		nav.to?.url.searchParams.set('lang', data.locale);
	});
</script>

<slot />
