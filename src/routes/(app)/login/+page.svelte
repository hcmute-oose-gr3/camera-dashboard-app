<script lang="ts">
	import { instanceOf } from '~/lib/utils';
	import LL from '~/i18n/i18n-svelte';
	import Button from '~/lib/components/PrimaryButton.svelte';
	import Input from '~/lib/components/Input.svelte';
	import type { ApiDataResponse, ApiErrorResponse, ApiResponse } from '~/lib/models/api-response';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import Spinner from '~/lib/components/Spinner.svelte';
	import { ApiRoutes } from '~/lib/utils/api-routes';
	import { onMount } from 'svelte';
	import { z } from 'zod';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import SecondaryButton from '~/lib/components/SecondaryButton.svelte';
	import LogoType from '~/lib/components/LogoType.svelte';
	import Link from '~/lib/components/Link.svelte';
	import type User from '~/lib/models/user';
	import Icon from '~/lib/components/Icon.svelte';
	import Pending from '~/lib/components/Pending.svelte';

	type FormFields = 'email' | 'password';

	export let data: PageData;
	let logging = true;
	let fieldErrors: Partial<Record<FormFields, string>> = {};
	let formResponse: ApiResponse | undefined;
	const inputElements: Record<FormFields, HTMLInputElement> = {} as any;

	onMount(() => {
		logging = false;
	});

	async function submit(this: HTMLFormElement) {
		logging = true;
		formResponse = undefined;

		const data = new FormData(this);
		const schema = z.object({
			email: z.string().trim().email($LL.login.email.regex()),
			password: z.string().nonempty($LL.login.password.empty()),
		});

		const result = await schema.safeParseAsync({
			email: data.get('email'),
			password: data.get('password'),
		});
		if (!result.success) {
			fieldErrors = {};
			result.error.issues.forEach((iss) => {
				fieldErrors[iss.path[0] as FormFields] = iss.message;
			});
			inputElements[result.error.issues[0].path[0] as FormFields].focus();
			logging = false;
			return;
		}

		fieldErrors = {};
		data.set('email', result.data.email);
		const json = await fetch(this.action, {
			method: 'post',
			body: data,
		}).then((v) => v.json());

		formResponse = json;
		if (instanceOf<ApiDataResponse<User>>(json, 'data')) {
			goto('/dashboard');
		} else if (instanceOf<ApiErrorResponse>(json, 'error')) {
			logging = false;
			json.error.message =
				json.error.code === 'MISSING_CREDENTIALS_ERROR'
					? $LL.login.error.missingCredentials()
					: json.error.code === 'EMAIL_NOT_FOUND_ERROR'
					? $LL.login.error.emailNotFound()
					: json.error.code === 'WRONG_PASSWORD_ERROR'
					? $LL.login.error.wrongPassword()
					: json.error.code === 'UNVERIFIED_ERROR'
					? $LL.login.error.unverified()
					: '';
		}
	}
</script>

{#if data.user}
	<section class="mx-auto w-fit mt-48 text-center">
		<h1 class="uppercase text-h1 text-8xl text-primary-700">{$LL.login.oops()}</h1>
		<h3 class="mt-4">{$LL.login.alreadyLoggedIn()}</h3>
		<div class="mt-4">
			<Link href="/">
				<Button type="button">{$LL.login.back()}</Button>
			</Link>
			<Link href="/logout" class="ml-4">
				<SecondaryButton type="button">{$LL.login.logout()}</SecondaryButton>
			</Link>
		</div>
	</section>
{:else}
	<div class="w-max mx-auto">
		<LogoType class="mt-16" fill="fill-primary-700" />
		<h3 class="text-center mt-6 text-fill-600">{$LL.login.header()}</h3>
		<div class="mx-auto w-min mt-4">
			<form
				class="text-left flex flex-col gap-y-6 min-w-[400px] bg-fill-100 border-fill-300 border-[1px] rounded-lg p-4"
				method="post"
				action={ApiRoutes.LOGIN}
				on:submit|preventDefault={submit}
			>
				<div class="flex flex-col gap-y-1">
					<Input
						autofocus
						bind:input={inputElements.email}
						id="email"
						name="email"
						type="email"
						spellcheck={false}
						novalidate="true"
						placeholder={$LL.login.email.placeholder()}
						label={$LL.login.email.label()}
						caption={fieldErrors?.email}
						accent={fieldErrors?.email ? 'negative' : undefined}
					/>
				</div>
				<div class="flex flex-col gap-y-1 relative">
					<Link href="/reset-password" class="absolute right-0 top-0">
						{$LL.login.forgotPassword()}
					</Link>
					<Input
						bind:input={inputElements.password}
						id="password"
						name="password"
						type="password"
						placeholder={$LL.login.password.placeholder()}
						class="transition"
						label={$LL.login.password.label()}
						caption={fieldErrors?.password}
						accent={fieldErrors?.password ? 'negative' : undefined}
					/>
				</div>
				<Button type="submit" class="w-max" disabled={logging}>
					<div class="flex gap-x-3 items-center">
						<Pending pending={logging}>
							<div slot="pending">
								<Spinner class="w-full h-full" />
							</div>
							<Icon name="ArrowRightOnRectangle" class="text-icon-base" />
						</Pending>
						{$LL.login.login()}
					</div>
				</Button>
			</form>
			<div class="bg-fill-200/20 border-fill-300 border-[1px] rounded-md p-4 mt-4">
				<span>{$LL.login.noAccount()}</span>{' '}
				<Link href="/signup">{$LL.login.signUp()}</Link>.
			</div>

			{#if formResponse}
				<div transition:fly={{ y: 20, easing: quadOut, duration: 200 }}>
					{#if instanceOf(formResponse, 'error')}
						<p
							class={`border-[1px] rounded-md p-4 mt-4 bg-negative-200 border-negative-400`}
						>
							{formResponse.error.message}.
						</p>
					{:else}
						<p
							class={`border-[1px] rounded-md p-4 mt-4 bg-positive-200 border-positive-400`}
						>
							{$LL.login.success()}.
						</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}
