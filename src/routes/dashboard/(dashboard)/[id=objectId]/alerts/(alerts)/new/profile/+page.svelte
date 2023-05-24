<script lang="ts">
	import Input from '~/lib/components/Input.svelte';
	import RowVisibilityAnimate from '~/lib/components/RowVisibilityAnimate.svelte';
	import Pending from '~/lib/components/Pending.svelte';
	import Radio from '~/lib/components/Radio.svelte';
	import LL from '~/i18n/i18n-svelte';
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';
	import Spinner from '~/lib/components/Spinner.svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import { onMount } from 'svelte';
	import { z } from 'zod';
	import { page } from '$app/stores';
	import type { ApiErrorResponse, ApiResponse } from '~/lib/models/api-response';
	import { fly } from 'svelte/transition';
	import { instanceOf, isValidTimeString } from '~/lib/utils';
	import Toast from '~/lib/components/Toast.svelte';
	import { quadIn, quadOut } from 'svelte/easing';
	import Select from '~/lib/components/Select.svelte';

	type Fields = 'name' | 'profile';

	$: ({ new: text } = $LL.dashboard.alert);

	let pending = true;
	let fieldErrors: { [key in Fields]?: string } = {};
	let inputElements: { [key in Fields]?: HTMLInputElement } = {};
	let formResponse: ApiResponse;

	async function submit(this: HTMLFormElement) {
		const formData = new FormData(this);

		const schema = z.object({
			name: z.string().min(1, text.name.nonempty()),
			profile: z.string().min(1, text.profile.profile.nonempty()),
		});

		const parse = await schema.safeParseAsync({
			name: formData.get('name'),
			profile: formData.get('profile'),
		});

		fieldErrors = {};
		if (!parse.success) {
			parse.error.issues.forEach((iss) => {
				fieldErrors[iss.path[0] as Fields] = iss.message;
			});
			for (const issue of parse.error.issues) {
				inputElements[issue.path[0] as Exclude<Fields, 'alertLevel'>]?.focus();
				break;
			}
			return;
		}

		pending = true;

		formResponse = await fetch(this.action, { method: 'post', body: formData })
			.then((v) => v.json())
			.catch(
				(e) =>
					({
						apiVersion: '',
						error: {
							code: e.name,
							message: e.message,
						},
					} satisfies ApiErrorResponse)
			)
			.finally(() => {
				pending = false;
			});
	}

	onMount(() => {
		pending = false;
	});
</script>

<form
	action="/api/v1/dashboard/{$page.params.id}/alerts&profileId=123"
	class="flex flex-col w-full gap-y-4"
	on:submit|preventDefault={submit}
>
	<div class="flex flex-col gap-y-1 w-fit min-w-[24rem]">
		<Input
			autofocus
			type="text"
			id="name"
			name="name"
			label={text.name.label()}
			placeholder={text.name.placeholder()}
			accent={fieldErrors.name ? 'negative' : undefined}
			caption={fieldErrors.name || undefined}
			aria-required
		/>
	</div>
	<div class="flex flex-col gap-y-1 w-fit min-w-[24rem]">
		<Select
			id="profile"
			name="profile"
			label={text.profile.profile.label()}
			accent={fieldErrors.profile ? 'negative' : undefined}
			caption={fieldErrors.profile || undefined}
			aria-required
		>
			<option value="1">Profile A</option>
			<option value="2">Profile B</option>
		</Select>
	</div>
	<PrimaryButton type="submit" class="w-fit">
		<div class="flex gap-x-1 items-center">
			<Pending {pending}>
				<div slot="pending">
					<Spinner class="w-full h-full" />
				</div>
				<Icon name="PlusSmall" class="text-icon-base" />
			</Pending>
			{text.submit()}
		</div>
	</PrimaryButton>
	{#if formResponse}
		{#key formResponse}
			<div
				in:fly={{ y: -4, delay: 200, duration: 100, easing: quadOut }}
				out:fly={{ y: 2, duration: 100, easing: quadIn }}
			>
				{#if instanceOf(formResponse, 'error')}
					<Toast
						icon="ExclamationCircle"
						iconClass="bg-negative-500"
						text="{formResponse.error.code}: {formResponse.error.message}"
						textClass="bg-negative-200"
					/>
				{:else}
					<Toast icon="Check" text={text.success()} />
				{/if}
			</div>
		{/key}
	{/if}
</form>
