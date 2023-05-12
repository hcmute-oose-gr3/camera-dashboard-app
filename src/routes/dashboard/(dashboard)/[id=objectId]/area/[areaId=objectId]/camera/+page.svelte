<script lang="ts">
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';
	import type { PageData } from './$types';
	import Table from './components/Table.svelte';
	import { page } from '$app/stores';
	import SecondaryButton from '~/lib/components/SecondaryButton.svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import CheckBox from '~/lib/components/CheckBox.svelte';

	export let data: PageData;
	let checked = Array(data.cameras.length).fill(false);
	function toggleCheckAll(e: Event) {
		checked = checked.map(() => (e.target as HTMLInputElement).checked);
	}
</script>

<ul class="flex gap-x-4 justify-between items-center">
	<li
		class="grid transition-[grid-template-rows] duration-300 ease-in {checked.some(
			(checked) => checked
		)
			? 'grid-rows-[1fr]'
			: 'grid-rows-[0fr]'}"
	>
		<div class="overflow-hidden">
			<div class="p-1 flex gap-x-2">
				<SecondaryButton class="align-middle border-negative-700 focus:ring-negative-500">
					<Icon name="Trash" class="text-negative-700" />
				</SecondaryButton>
				<CheckBox
					on:input={toggleCheckAll}
					checked={checked.every((v) => v)}
					class="lg:hidden w-8 h-8 rounded-md"
				/>
			</div>
		</div>
	</li>
</ul>
<Table cameras={data.cameras} bind:checked />
