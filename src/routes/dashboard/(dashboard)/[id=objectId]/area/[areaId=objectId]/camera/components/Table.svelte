<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { DeleteResult } from 'mongodb';
	import { flip } from 'svelte/animate';
	import { quadInOut } from 'svelte/easing';
	import LL from '~/i18n/i18n-svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import CheckBox from '~/lib/components/CheckBox.svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import Pending from '~/lib/components/Pending.svelte';
	import SecondaryButton from '~/lib/components/SecondaryButton.svelte';
	import Spinner from '~/lib/components/Spinner.svelte';
	import type { ApiDataResponse, ApiErrorResponse } from '~/lib/models/api-response';
	import { CameraConnection, CameraSecurityLevel, type Camera } from '~/lib/models/dashboard';
	import { instanceOf } from '~/lib/utils';
	export let cameras: (Camera & { _id: string })[];
	export let checked: boolean[];
	let deletePendings: boolean[] = [];
	let text: TranslationFunctions['camera']['table'];
	$: text = $LL.camera.table;
	function toggleCheckAll(e: Event) {
		checked = checked.map(() => (e.target as HTMLInputElement).checked);
	}
	function toggleCheck(index: number) {
		checked[index] = !checked[index];
	}
	async function deleteThis(index: number) {
		const camera = cameras[index];
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
			cameras.splice(index, 1);
			cameras = cameras;
			checked = checked;
		}
	}
	async function deleteSome() {
		const deleting = cameras.filter((_, i) => checked[i]).map((c) => c._id);
		deletePendings = checked.map((v) => v);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const json = await fetch(
			`/api/v1/dashboard/${$page.params.id}/area/${$page.params.areaId}/camera`,
			{ method: 'delete', body: JSON.stringify(deleting) }
		)
			.then((v) => v.json())
			.finally(() => {
				deletePendings = [];
			});
		if (instanceOf<ApiErrorResponse>(json, 'error')) {
			alert(json.error.message);
		} else if (instanceOf<ApiDataResponse<DeleteResult>>(json, 'data')) {
			invalidate('camera');
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
			<th class="px-4 py-6 text-fill-700">{text.connection.header()}</th>
			<th class="px-4 py-6 text-fill-700">{text.securityLevel.header()}</th>
			<th class="px-4 py-6 text-fill-700">{text.actions.header()}</th>
		</tr>
	</thead>
	<tbody>
		{#each cameras as camera, i (camera._id)}
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
					>{parseInt(camera._id.substring(camera._id.length - 6), 16)}</td
				>
				<td class="block lg:table-cell px-4 py-6"
					><span class="lg:hidden inline-block w-36 text-fill-700 font-bold"
						>{text.name.header()}:</span
					>{camera.name}</td
				>
				<td class="block lg:table-cell px-4 py-6"
					><span class="lg:hidden inline-block w-36 text-fill-700 font-bold"
						>{text.connection.header()}:</span
					>{camera.connection === CameraConnection.Disconnected
						? text.connection.disconnected()
						: text.connection.connected()}</td
				>
				<td class="block lg:table-cell px-4 py-6"
					><span class="lg:hidden inline-block w-36 text-fill-700 font-bold"
						>{text.securityLevel.header()}:</span
					>{camera.securityLevel === CameraSecurityLevel.Low
						? text.securityLevel.low()
						: camera.securityLevel === CameraSecurityLevel.Medium
						? text.securityLevel.medium()
						: text.securityLevel.high()}</td
				>
				<td class="lg:hidden pr-4 w-0">
					<div class="flex flex-col gap-y-4 items-center justify-between">
						<a
							href="/dashboard/{$page.params.id}/area/{$page.params
								.areaId}/camera/{camera._id}/edit"
						>
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
						<a
							class="flex"
							href="/dashboard/{$page.params.id}/area/{$page.params
								.areaId}/camera/{camera._id}/edit"
						>
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
