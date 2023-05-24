<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { DeleteResult } from 'mongodb';
	import { flip } from 'svelte/animate';
	import { quadInOut } from 'svelte/easing';
	import LL from '~/i18n/i18n-svelte';
	import CheckBox from '~/lib/components/CheckBox.svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import Pending from '~/lib/components/Pending.svelte';
	import SecondaryButton from '~/lib/components/SecondaryButton.svelte';
	import Spinner from '~/lib/components/Spinner.svelte';
	import type {
		Alert,
		ProfileBasedAlert,
		TimeBasedAlert,
		ZoneBasedAlert,
	} from '~/lib/models/alert';
	import type { ApiDataResponse, ApiErrorResponse } from '~/lib/models/api-response';
	import { instanceOf } from '~/lib/utils';
	export let alerts: ((ProfileBasedAlert | TimeBasedAlert | ZoneBasedAlert) & { _id: string })[];
	export let checked: boolean[];
	let deletePendings: boolean[] = [];
	$: ({ table: text } = $LL.dashboard.alert);
	function toggleCheckAll(e: Event) {
		checked = checked.map(() => (e.target as HTMLInputElement).checked);
	}
	function toggleCheck(index: number) {
		checked[index] = !checked[index];
	}
	async function deleteThis(index: number) {
		const alert = alerts[index];
		deletePendings[index] = true;
		const json = await fetch(`/api/v1/dashboard/${$page.params.id}/alerts/${alert._id}`, {
			method: 'delete',
		})
			.then((v) => v.json())
			.finally(() => {
				deletePendings[index] = false;
			});
		if (instanceOf<ApiErrorResponse>(json, 'error')) {
			// TODO: Display error
		} else if (instanceOf<ApiDataResponse<DeleteResult>>(json, 'data')) {
			checked.splice(index, 1);
			alerts.splice(index, 1);
			alerts = alerts;
			checked = checked;
		}
	}
	async function deleteSome() {
		const deleting = alerts.filter((_, i) => checked[i]).map((c) => c._id);
		deletePendings = checked.map((v) => v);
		console.log(deletePendings);
		const json = await fetch(`/api/v1/dashboard/${$page.params.id}/alerts`, {
			method: 'delete',
			body: JSON.stringify(deleting),
		})
			.then((v) => v.json())
			.finally(() => {
				deletePendings = [];
			});
		if (instanceOf<ApiErrorResponse>(json, 'error')) {
			// TODO: Display error
		} else if (instanceOf<ApiDataResponse<DeleteResult>>(json, 'data')) {
			invalidate('alerts');
			checked = checked.filter((v) => !v);
		}
	}

	$: deletingSome = deletePendings.some((v) => v);
	$: someChecked = checked.some((v) => v);
	$: allChecked = checked.every((v) => v);
</script>

<table class="table-auto text-left w-full transition-all">
	<thead class="text-fill-700 font-bold">
		<tr class="hidden lg:table-row">
			<th class="px-4 py-6 w-0 text-fill-700"
				><CheckBox
					on:input={toggleCheckAll}
					indeterminate={someChecked && !allChecked}
					checked={allChecked}
					class="w-5 h-5"
				/></th
			>
			<th class="relative px-4 py-6 text-fill-700">
				<div
					class="absolute top-1/2 -translate-y-1/2 grid transition-[grid-template-rows] duration-200 ease-in-out {someChecked
						? 'grid-rows-[1fr]'
						: 'grid-rows-[0fr]'}"
				>
					<div class="overflow-hidden">
						<div class="p-1 flex">
							<SecondaryButton
								class="text-negative-700 border-negative-700 p-0.5
								disabled:border-transparent disabled:bg-negative-300 focus:ring-negative-500"
								on:click={deleteSome}
								disabled={deletingSome}
							>
								<Pending pending={deletingSome}>
									<div slot="pending">
										<Spinner class="w-full h-full text-negative-700" />
									</div>
									<Icon name="Trash" class="w-7 h-7" />
								</Pending>
							</SecondaryButton>
						</div>
					</div>
				</div>
				<div
					class="grid transition-[grid-template-rows opacity] duration-200 ease-in-out {!someChecked
						? 'grid-rows-[1fr]'
						: 'grid-rows-[0fr]'}"
				>
					<span class="overflow-hidden">
						{text.serial.header()}
					</span>
				</div>
			</th>
			<th class="px-4 py-6 text-fill-700">{text.name.header()}</th>
			<th class="px-4 py-6 text-fill-700">{text.type.header()}</th>
			<th class="px-4 py-6 text-fill-700">{text.actions.header()}</th>
		</tr>
	</thead>
	<tbody>
		{#each alerts as alert, i (alert._id)}
			<tr
				animate:flip={{ duration: 400, easing: quadInOut }}
				class="border-b border-primary-200 hover:bg-primary-100 transition-colors duration-75"
				on:click={() => {
					toggleCheck(i);
				}}
			>
				<td class="hidden lg:table-cell px-4 py-6 w-0"
					><CheckBox
						bind:checked={checked[i]}
						on:click={(e) => {
							e.stopPropagation();
						}}
						class="w-5 h-5"
					/></td
				>
				<td class="block lg:table-cell px-4 py-6"
					><span class="lg:hidden inline-block w-36 text-fill-700 font-bold"
						>{text.serial.header()}:</span
					>{parseInt(alert._id.substring(alert._id.length - 6), 16)}</td
				>
				<td class="block lg:table-cell px-4 py-6"
					><span class="lg:hidden inline-block w-36 text-fill-700 font-bold"
						>{text.name.header()}:</span
					>{alert.name}</td
				>
				<td class="flex lg:table-cell px-4 py-6">
					<span class="lg:hidden inline-block w-36 text-fill-700 font-bold"
						>{text.type.header()}:</span
					>
					{#if instanceOf(alert, 'profileId')}
						<Icon name="UserCircle" />
					{:else if instanceOf(alert, 'cameraId')}
						<div class="flex gap-x-4 items-center">
							<Icon name="MapPin" class="text-yellow-700" />
							<span
								class="border-yellow-300 text-yellow-700 border px-1 rounded-lg font-bold text-sm"
							>
								{text.type.zoneBased()}
							</span>
						</div>
					{:else if instanceOf(alert, 'startTime')}
						<div class="flex gap-x-4 items-center">
							<Icon name="Clock" class="text-positive-700" />
							<span
								class="border-positive-300 text-positive-700 border px-1 rounded-lg font-bold text-sm"
							>
								{alert.startTime} - {alert.endTime}
							</span>
						</div>
					{/if}
				</td>
				<td class="lg:hidden pr-4 w-0">
					<div class="flex flex-col gap-y-4 items-center justify-between">
						<a href="./alerts">
							<SecondaryButton class="text-yellow-600 border-yellow-600 p-0.5">
								<Icon name="Pencil" class="w-7 h-7" />
							</SecondaryButton>
						</a>
						<SecondaryButton
							class="text-negative-700 border-negative-700 p-0.5
							disabled:border-transparent disabled:bg-negative-300 focus:ring-negative-500"
							on:click={(e) => {
								e.stopPropagation();
								deleteThis(i);
							}}
							disabled={deletePendings[i]}
						>
							<Pending pending={deletePendings[i]}>
								<div slot="pending">
									<Spinner class="w-full h-full text-negative-700" />
								</div>
								<Icon name="Trash" class="w-7 h-7" />
							</Pending>
						</SecondaryButton>
					</div>
				</td>
				<td class="hidden lg:table-cell px-4 py-6">
					<div class="flex gap-x-4 items-center">
						<a class="flex" href="./alerts">
							<SecondaryButton class="text-yellow-600 border-yellow-600 p-0.5">
								<Icon name="Pencil" class="w-7 h-7" />
							</SecondaryButton>
						</a>
						<SecondaryButton
							class="text-negative-700 border-negative-700 p-0.5
							disabled:border-transparent disabled:bg-negative-300 focus:ring-negative-500"
							on:click={(e) => {
								e.stopPropagation();
								deleteThis(i);
							}}
							disabled={deletePendings[i]}
						>
							<Pending pending={deletePendings[i]}>
								<div slot="pending">
									<Spinner class="w-full h-full text-negative-700" />
								</div>
								<Icon name="Trash" class="w-7 h-7" />
							</Pending>
						</SecondaryButton>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
