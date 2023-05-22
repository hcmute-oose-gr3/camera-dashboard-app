<script lang="ts">
	import { onMount } from 'svelte';
	import { backIn, backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { z } from 'zod';
	import LL from '~/i18n/i18n-svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import Input from '~/lib/components/Input.svelte';
	import Pending from '~/lib/components/Pending.svelte';
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';
	import Spinner from '~/lib/components/Spinner.svelte';
	import Toast from '~/lib/components/Toast.svelte';
	import type { ApiResponse } from '~/lib/models/api-response';
	import { instanceOf } from '~/lib/utils';
	import { meta } from '~/routes';

	type FormFields = 'name';

	let pending = true;
	let fieldErrors: { [key in FormFields]?: string } = {};
	let inputElements: { [key in FormFields]?: HTMLInputElement } = {};
	let formResponse: ApiResponse;
	$: ({ add: text } = $LL.dashboard);

	onMount(() => {
		pending = false;
	});

	async function submit(this: HTMLFormElement, e: SubmitEvent) {
		e.preventDefault();

		const schema = z.object({
			name: z.string().min(1, text.name.nonempty()),
		});

		const formData = new FormData(this);
		const parse = await schema.safeParseAsync({
			name: formData.get('name') ?? '',
		});

		fieldErrors = {};
		if (!parse.success) {
			parse.error.issues.forEach((iss) => {
				fieldErrors[iss.path[0] as FormFields] = iss.message;
			});
			for (const issue of parse.error.issues) {
				inputElements[issue.path[0] as FormFields]?.focus();
				break;
			}
			return;
		}

		pending = true;
		formResponse = await fetch(this.action, { method: 'post', body: formData })
			.then((v) => v.json())
			.finally(() => {
				pending = false;
			});
	}

	$meta.title = $LL.dashboard.add.meta.title();
</script>

<p class="mt-1 font-body font-medium">{text.legends()}</p>
<form action="/api/v1/dashboard" class="mt-4 flex flex-col gap-y-4" on:submit={submit}>
	<div class="flex flex-col gap-y-1 w-fit min-w-[21em]">
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
	<PrimaryButton type="submit" class="w-max" disabled={pending}>
		<div class="flex gap-x-3 items-center">
			<Pending {pending}>
				<div slot="pending">
					<Spinner class="w-full h-full" />
				</div>
				<Icon name="PlusCircle" class="text-icon-base" />
			</Pending>
			{text.submit()}
		</div>
	</PrimaryButton>
	{#if formResponse}
		{#key formResponse}
			<div
				in:fly={{ y: -8, delay: 100, duration: 400, easing: backOut }}
				out:fly={{ y: 4, duration: 100, easing: backIn }}
			>
				{#if instanceOf(formResponse, 'error')}
					<Toast
						icon="ExclamationCircle"
						iconClass="bg-negative-500"
						text={formResponse.error.message}
						textClass="bg-negative-200"
					/>
				{:else}
					<Toast icon="Check" text={text.success()} />
				{/if}
			</div>
		{/key}
	{/if}
</form>
