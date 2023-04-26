<script lang="ts">
	import type { WithId } from 'mongodb';
	import LL from '~/i18n/i18n-svelte';
	import type { Dashboard } from '~/lib/models/dashboard';

	export let data: WithId<Dashboard>;
</script>

<a href="/dashboard/{data._id}" class="block">
	<button
		type="button"
		class="w-full h-full text-left font-normal bg-primary-100 border border-primary-200 p-6 rounded-lg shadow flex flex-col justify-between transition ease-in-out
		hover:bg-primary-200 hover:border-primary-300
		focus:ring focus:ring-offset-1 focus:ring-primary-500
		active:duration-150 active:ease-in active:scale-[0.97] active:ring-transparent"
	>
		<h1 class="text-primary-700">{data.name}</h1>
		<div class="text-fill-600">
			<p>
				{$LL.dashboard.card.createdAt({ date: new Date(data.createdAt) })}.
			</p>
			<p>
				{$LL.dashboard.card.updatedAt({ date: new Date(data.updatedAt) })}.
			</p>
		</div>
	</button>
</a>
