<script lang="ts">
	import LL from '~/i18n/i18n-svelte';
	import LogoType from '~/lib/components/LogoType.svelte';
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';
	import { ApiRoutes } from '~/lib/utils/api-routes';
	import type { PageData } from './$types';
	import { error } from '@sveltejs/kit';
	import { instanceOf } from '~/lib/utils';
	import Link from '~/lib/components/Link.svelte';
	export let data: PageData;
</script>

<div class="mx-auto">
	<h1 class="text-center mx-auto">
		<LogoType class="mt-16" fill="fill-primary-700" />
	</h1>
	{#if data.success}
		<p class="mx-auto w-fit mt-8 text-positive-700 text-h4">
			{data.message}
		</p>
		<div class="bg-fill-200/20 border-fill-300 mx-auto w-fit mt-8">
			<Link href="/">
				<PrimaryButton type="button">{$LL.signup.back()}</PrimaryButton>
			</Link>
		</div>
	{:else if data.home}
		<p class="mx-auto w-fit mt-8 text-negative-700 text-h4">
			{data.message}
		</p>
		<div class="bg-fill-200/20 border-fill-300 mx-auto w-fit mt-8">
			<Link href="/">
				<PrimaryButton type="button">{$LL.login.back()}</PrimaryButton>
			</Link>
		</div>
	{:else}
		<p class="mx-auto w-fit mt-8 text-negative-700 text-h4">
			{data.message}
		</p>
		<div class="bg-fill-200/20 border-fill-300 mx-auto w-fit mt-8">
			<Link href="/signup">
				<PrimaryButton type="button">{$LL.login.back()}</PrimaryButton>
			</Link>
		</div>
	{/if}
</div>
