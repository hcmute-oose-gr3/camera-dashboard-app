<script lang="ts">
	import { page } from '$app/stores';
	import type { DeleteResult, WithId } from 'mongodb';
	import { flip } from 'svelte/animate';
	import { quadInOut } from 'svelte/easing';
	import LL from '~/i18n/i18n-svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import CheckBox from '~/lib/components/CheckBox.svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import SecondaryButton from '~/lib/components/SecondaryButton.svelte';
	import type { ApiErrorResponse, ApiDataResponse } from '~/lib/models/api-response';
	import type { Area } from '~/lib/models/dashboard';
	import { instanceOf } from '~/lib/utils';
	import { ApiRoutes } from '~/lib/utils/api-routes';
	export let areas: WithId<Area>[];
	export let checked: boolean[];
	let deletePendings: boolean[] = [];
	let text: TranslationFunctions['dashboard']['area']['table'];
	$: text = $LL.dashboard.area.table;
	function toggleCheckAll(e: Event) {
		checked = checked.map(() => (e.target as HTMLInputElement).checked);
	}
	function toggleCheck(index: number) {
		checked[index] = !checked[index];
	}
	async function handleActivate(index: number) {
		const form = new FormData();
		const area = areas[index];
		form.set('activate', area.activate);
		form.set('id', $page.params.id);
		form.set('idA', area._id);
		const json = await fetch(ApiRoutes.AREA, {
			method: 'put',
			body: form
		}).then((v) => {
			area.activate = !area.activate;
			areas = areas;
		});
	}
	async function deleteThis(index: number) {
		const camera = areas[index];
		deletePendings[index] = true;
		const json = await fetch(
			`/api/v1/dashboard/${$page.params.id}/area/${$page.params.areaId}/camera/${camera._id}`,
			{ method: 'delete' }
		)
			.then((v) => v.json())
			.finally(() => {
				deletePendings[index] = false;
			});
		if (instanceOf<ApiErrorResponse>(json, 'error')) {
			alert(json.error.message);
		} else if (instanceOf<ApiDataResponse<DeleteResult>>(json, 'data')) {
			checked.splice(index, 1);
			areas.splice(index, 1);
			areas = areas;
			checked = checked;
		}
	}
</script>

<table class="table-auto text-left w-full transition-all rounded-2xl">
	<thead class="font-display text-h4">
		<tr class="hidden lg:table-row border-b border-primary-200">
			<th class="p-4 w-0 bg-primary-100 rounded-tl-2xl"
				><CheckBox
					on:input={toggleCheckAll}
					checked={!!checked.length && checked.every((v) => v)}
				/></th
			>
			<th class="p-4 bg-primary-100">{text.serial.header()}</th>
			<th class="p-4 bg-primary-100">{text.name.header()}</th>
			<th class="p-4 bg-primary-100">{text.activate.header()}</th>
			<th class="p-4 bg-primary-100 rounded-tr-2xl">{text.actions.header()}</th>
		</tr>
	</thead>
	<tbody>
		{#each areas as area, i (area._id)}
			<tr
				animate:flip={{ duration: 400, easing: quadInOut }}
				class="border-b border-primary-200 hover:bg-primary-100 transition-colors duration-75"
				on:click={() => {
					toggleCheck(i);
				}}
			>
				<td class="hidden lg:table-cell p-4 w-0"
					><CheckBox
						bind:checked={checked[i]}
						on:click={(e) => {
							e.stopPropagation();
						}}
					/></td
				>
				<td class="block lg:table-cell p-4"
					><span class="lg:hidden inline-block w-36 font-display text-h4"
						>{text.serial.header()}:</span
					>{parseInt(area?._id?.substring(area?._id?.length - 6), 16)}</td
				>
				<td class="block lg:table-cell p-4"
					><span class="lg:hidden inline-block w-36 font-display text-h4"
						>{text.name.header()}:</span
					>
					<a href={`/dashboard/${$page.params.id}/area/${area._id}/camera`}>
						{area.name}
					</a></td
				>
				<td class="block lg:table-cell p-4"
					><span class="lg:hidden inline-block w-36 font-display text-h4"
						>{text.activate.header()}:</span
					>{#if area.activate}
						<button
							on:click={(e) => {
								e.stopPropagation();
								handleActivate(i);
							}}
						>
							<Icon name="CheckCircle" class="text-green-700 text-center w-full" />
						</button>
					{:else}
						<button
							on:click={(e) => {
								e.stopPropagation();
								handleActivate(i);
							}}
						>
							<Icon name="XCircle" class="text-red-700 text-center w-full" />
						</button>
					{/if}</td
				>
				<td class="lg:hidden p-4">
					<div class="flex flex-col gap-y-4 items-center justify-between">
						<CheckBox
							bind:checked={checked[i]}
							on:click={(e) => {
								e.stopPropagation();
							}}
							class="lg:hidden w-8 h-8 rounded-md"
						/>
						<SecondaryButton
							class="text-negative-700 border-negative-700 p-1"
							on:click={(e) => {
								e.stopPropagation();
								deleteThis(i);
							}}
							disabled={deletePendings[i]}
						>
							<Icon name="Trash" class="w-6 h-6" />
						</SecondaryButton>
					</div>
				</td>
				<td class="hidden lg:table-cell p-4">
					<div class="flex gap-x-4 items-center">
						<SecondaryButton
							class="text-negative-700 border-negative-700 p-1"
							on:click={(e) => {
								e.stopPropagation();
								deleteThis(i);
							}}
							disabled={deletePendings[i]}
						>
							<Icon name="Trash" class="w-6 h-6" />
						</SecondaryButton>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
