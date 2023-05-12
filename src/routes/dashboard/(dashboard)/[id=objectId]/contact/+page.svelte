<script lang="ts">
	import { onMount } from 'svelte';
	import { quadOut, sineIn } from 'svelte/easing';
	import LL from '~/i18n/i18n-svelte';
	import Input from '~/lib/components/Input.svelte';
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';
	import Spinner from '~/lib/components/Spinner.svelte';
	import type { ApiDataResponse, ApiResponse } from '~/lib/models/api-response';
	import { ApiRoutes } from '~/lib/utils/api-routes';
	import { z } from 'zod';
	import { fly } from 'svelte/transition';
	import { instanceOf } from '~/lib/utils';
	import { goto } from '$app/navigation';
	import LogoType from '~/lib/components/LogoType.svelte';
	import type User from '~/lib/models/user';
	import Icon from '~/lib/components/Icon.svelte';
	import type { PageData } from './$types';
	import Link from '~/lib/components/Link.svelte';
	import SecondaryButton from '~/lib/components/SecondaryButton.svelte';
	import type { InsertOneResult } from 'mongodb';

	type FormFields = 'name' | 'mail' | 'phone';

	let fieldErrors: Partial<Record<FormFields, string>> = {};
	const inputElements: Record<FormFields, HTMLInputElement> = {} as any;
</script>

<div class="w-full h-full">
	<div class="w-fit px-12 shadow-2xl mt-3 rounded-2xl h-full mx-auto">
		<div class="w-fit mx-auto">
			<h1>{$LL.dashboard.contact.title()}</h1>
			<p class="text-xs text-center">{$LL.dashboard.contact.subtitle()}</p>
		</div>
		<div class="py-8">
			<h3>{$LL.dashboard.contact.form.title()}</h3>
		</div>
		<div class="flex space-x-12">
			<div class="flex flex-col space-y-8">
				<div class="flex flex-col gap-y-1">
					<Input
						bind:input={inputElements.name}
						id="name"
						name="name"
						type="text"
						spellcheck={false}
						placeholder={$LL.dashboard.contact.form.name.placehodler()}
						class="transition"
						label={$LL.dashboard.contact.form.name.title()}
						caption={fieldErrors?.name}
						accent={fieldErrors?.name ? 'negative' : undefined}
					/>
				</div>
				<div class="flex flex-col gap-y-1">
					<Input
						bind:input={inputElements.mail}
						id="name"
						name="name"
						type="text"
						spellcheck={false}
						placeholder={$LL.dashboard.contact.form.mail.placehodler()}
						class="transition"
						label={$LL.dashboard.contact.form.mail.title()}
						caption={fieldErrors?.mail}
						accent={fieldErrors?.mail ? 'negative' : undefined}
					/>
				</div>
				<div class="flex flex-col gap-y-1">
					<Input
						bind:input={inputElements.phone}
						id="name"
						name="name"
						type="text"
						spellcheck={false}
						placeholder={$LL.dashboard.contact.form.phone.placehodler()}
						class="transition"
						label={$LL.dashboard.contact.form.phone.title()}
						caption={fieldErrors?.phone}
						accent={fieldErrors?.phone ? 'negative' : undefined}
					/>
				</div>
			</div>
			<div>
				<p>Message</p>
				<textarea
					name="text"
					id="text"
					cols="30"
					rows="10"
					placeholder={$LL.dashboard.contact.form.message.placeholder()}
					class="border-[1px] rounded-xl"
				/>
			</div>
		</div>
		<div class="py-8 space-y-6">
			<h3>{$LL.dashboard.contact.service.title()}</h3>
			<div class="flex space-x-10">
				<p class="bg-black bg-opacity-5 w-[100px] text-center rounded-xl py-2">
					{$LL.dashboard.contact.service.feature.area()}
				</p>
				<p class="bg-black bg-opacity-5 w-[100px] text-center rounded-xl py-2">
					{$LL.dashboard.contact.service.feature.camera()}
				</p>
				<p class="bg-black bg-opacity-5 w-[100px] text-center rounded-xl py-2">
					{$LL.dashboard.contact.service.feature.contact()}
				</p>
				<p class="bg-black bg-opacity-5 w-[100px] text-center rounded-xl py-2">
					{$LL.dashboard.contact.service.feature.other()}
				</p>
			</div>
			<div class="w-fit mx-auto">
				<p class="bg-red-400 p-3 text-center rounded-xl py-2 text-white">
					{$LL.dashboard.contact.button.title()}
				</p>
			</div>
		</div>
	</div>
</div>
