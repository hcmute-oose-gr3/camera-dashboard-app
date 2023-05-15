<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { quadIn, quadOut } from 'svelte/easing';
	import { fly, scale, slide } from 'svelte/transition';
	import { z } from 'zod';
	import LL from '~/i18n/i18n-svelte';
	import Icon from '~/lib/components/Icon.svelte';
	// updatedAt: Date;
	// serial: string;
	// homeId: string;
	// name: string;
	// url: string;
	// connection: CameraConnection;
	// securityLevel: CameraSecurityLevel;

	import Input from '~/lib/components/Input.svelte';
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';
	import Radio from '~/lib/components/Radio.svelte';
	import RowVisibilityAnimate from '~/lib/components/RowVisibilityAnimate.svelte';
	import Spinner from '~/lib/components/Spinner.svelte';
	import Toast from '~/lib/components/Toast.svelte';
	import type { ApiResponse } from '~/lib/models/api-response';
	import { instanceOf } from '~/lib/utils';

	type FormFields = 'name' | 'url' | 'securityLevel';

	let pending = true;
	let fieldErrors: { [key in FormFields]?: string } = {};
	let inputElements: { [key in Exclude<FormFields, 'securityLevel'>]?: HTMLInputElement } = {};
	let text = $LL.camera.addForm;
	$: text = $LL.camera.addForm;
	let formResponse: ApiResponse;

	onMount(() => {
		pending = false;
	});

	async function submit(this: HTMLFormElement, e: SubmitEvent) {
		e.preventDefault();

		const schema = z.object({
			name: z.string().min(1, text.name.nonempty()),
			url: z.string().url(text.url.url()),
			securityLevel: z
				.string()
				.refine(
					(v) => v === 'low' || v === 'medium' || v === 'high',
					text.securityLevel.required()
				),
		});

		const formData = new FormData(this);
		const securityLevelString = formData.get('securityLevel')?.toString().toLowerCase() ?? '';
		const parse = await schema.safeParseAsync({
			name: formData.get('name') ?? '',
			url: formData.get('url') ?? '',
			securityLevel: securityLevelString,
		});

		fieldErrors = {};
		if (!parse.success) {
			parse.error.issues.forEach((iss) => {
				fieldErrors[iss.path[0] as FormFields] = iss.message;
			});
			for (const issue of parse.error.issues) {
				if (issue.path[0] === 'securityLevel') {
					continue;
				}
				inputElements[issue.path[0] as Exclude<FormFields, 'securityLevel'>]?.focus();
				break;
			}
			return;
		}

		pending = true;
		formData.set(
			'securityLevel',
			securityLevelString === 'low' ? '0' : securityLevelString === 'medium' ? '1' : '2'
		);
		formResponse = await fetch(this.action, { method: 'post', body: formData })
			.then((v) => v.json())
			.catch(() => {
				// TODO: handle form error
				return null;
			})
			.finally(() => {
				pending = false;
			});
	}
</script>

<form
	action="/api/v1/dashboard/{$page.params.id}/area/{$page.params.areaId}/camera"
	class="flex flex-col gap-y-4"
	on:submit={submit}
>
	<div class="flex flex-col gap-y-1">
		<Input
			bind:input={inputElements.name}
			name="name"
			id="name"
			type="text"
			label={text.name.label()}
			caption={fieldErrors.name}
			accent={fieldErrors.name ? 'negative' : undefined}
			placeholder={text.name.placeholder()}
		/>
	</div>
	<div class="flex flex-col gap-y-1">
		<Input
			bind:input={inputElements.url}
			name="url"
			id="url"
			type="text"
			label={text.url.label()}
			caption={fieldErrors.url}
			accent={fieldErrors.url ? 'negative' : undefined}
			placeholder={text.url.placeholder()}
		/>
	</div>
	<fieldset class="flex flex-col gap-y-1">
		<legend> {text.securityLevel.legend()} </legend>
		<div class="flex gap-x-6">
			<div class="flex gap-x-2 items-center">
				<label for="securityLevelLow">{text.securityLevel.low.label()}</label>
				<Radio
					id="securityLevelLow"
					name="securityLevel"
					value="low"
					class="text-negative-700 focus:ring-negative-500"
				/>
			</div>
			<div class="flex gap-x-2 items-center">
				<label for="securityLevelMedium">{text.securityLevel.medium.label()}</label>
				<Radio
					id="securityLevelMedium"
					name="securityLevel"
					value="medium"
					class="text-yellow-600 focus:ring-yellow-500"
				/>
			</div>
			<div class="flex gap-x-2 items-center">
				<label for="securityLevelHigh">{text.securityLevel.high.label()}</label>
				<Radio
					id="securityLevelHigh"
					name="securityLevel"
					value="high"
					class="text-positive-700 focus:ring-positive-500"
				/>
			</div>
		</div>
		<RowVisibilityAnimate visible={!fieldErrors.securityLevel}>
			<p class="text-negative-700">
				{fieldErrors.securityLevel}
			</p>
		</RowVisibilityAnimate>
	</fieldset>
	<PrimaryButton type="submit" class="w-max" disabled={pending}>
		<div class="flex gap-x-3 items-center">
			<div class="w-6 h-6 relative overflow-hidden">
				<div
					class="absolute transition duration-200 ease-in-out {!pending
						? 'scale-0 opacity-0'
						: ''}"
				>
					<Spinner class="w-full h-full" />
				</div>
				<Icon
					name="PlusCircle"
					class="transition duration-200 text-icon-base ease-in-out {pending
						? 'scale-0 opacity-0'
						: ''}"
				/>
			</div>
			{text.submit()}
		</div>
	</PrimaryButton>
	{#if formResponse}
		{#key formResponse}
			<div
				in:fly={{ y: -10, delay: 200, duration: 100, easing: quadOut }}
				out:fly={{ y: 10, duration: 200, easing: quadIn }}
			>
				{#if instanceOf(formResponse, 'error')}
					<Toast
						icon="ExclamationCircle"
						iconClass="bg-negative-500"
						text="TODO: Error"
						textClass="bg-negative-200"
					/>
				{:else}
					<Toast icon="Check" text={text.success()} />
				{/if}
			</div>
		{/key}
	{/if}
</form>
