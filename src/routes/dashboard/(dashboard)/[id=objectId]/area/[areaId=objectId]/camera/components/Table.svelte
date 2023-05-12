<script lang="ts">
	import { page } from '$app/stores';
	import type { DeleteResult, WithId } from 'mongodb';
	import { flip } from 'svelte/animate';
	import { quadIn, quadInOut, quadOut } from 'svelte/easing';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import LL from '~/i18n/i18n-svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import CheckBox from '~/lib/components/CheckBox.svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import SecondaryButton from '~/lib/components/SecondaryButton.svelte';
	import type { ApiErrorResponse, ApiDataResponse } from '~/lib/models/api-response';
	import { CameraConnection, type Camera, CameraSecurityLevel } from '~/lib/models/dashboard';
	import { instanceOf } from '~/lib/utils';
	export let cameras: WithId<Camera>[];
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
			<th class="p-4 bg-primary-100">{text.connection.header()}</th>
			<th class="p-4 bg-primary-100">{text.securityLevel.header()}</th>
			<th class="p-4 bg-primary-100 rounded-tr-2xl">{text.actions.header()}</th>
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
					>{parseInt(camera._id.substring(camera._id.length - 6), 16)}</td
				>
				<td class="block lg:table-cell p-4"
					><span class="lg:hidden inline-block w-36 font-display text-h4"
						>{text.name.header()}:</span
					>{camera.name}</td
				>
				<td class="block lg:table-cell p-4"
					><span class="lg:hidden inline-block w-36 font-display text-h4"
						>{text.connection.header()}:</span
					>{camera.connection === CameraConnection.Disconnected
						? text.connection.disconnected()
						: text.connection.connected()}</td
				>
				<td class="block lg:table-cell p-4"
					><span class="lg:hidden inline-block w-36 font-display text-h4"
						>{text.securityLevel.header()}:</span
					>{camera.securityLevel === CameraSecurityLevel.Low
						? text.securityLevel.low()
						: camera.securityLevel === CameraSecurityLevel.Medium
						? text.securityLevel.medium()
						: text.securityLevel.high()}</td
				>
				<td class="lg:hidden pr-4 w-0">
					<div class="flex flex-col gap-y-4 items-center justify-between">
						<CheckBox
							bind:checked={checked[i]}
							on:click={(e) => {
								e.stopPropagation();
							}}
							class="lg:hidden w-8 h-8 rounded-md"
						/>
						<SecondaryButton
							class="text-yellow-600 border-yellow-600 p-1"
							on:click={(e) => {
								e.stopImmediatePropagation();
							}}
						>
							<Icon name="Pencil" class="w-6 h-6" />
						</SecondaryButton>
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
				<td class="hidden lg:table-cell pr-4 w-0">
					<div class="flex gap-x-4 items-center">
						<SecondaryButton
							class="text-yellow-600 border-yellow-600 p-1"
							on:click={(e) => {
								e.stopPropagation();
							}}
						>
							<Icon name="Pencil" class="w-6 h-6" />
						</SecondaryButton>
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
