import { instanceOf } from '~/lib/utils';
import type { PageLoad } from './$types';
import type { ApiErrorResponse } from '~/lib/models/api-response';
import { get } from 'svelte/store';
import LL from '~/i18n/i18n-svelte';

export const load = (async (e) => {
	console.log('page load', e.data);
	await e.parent();
	if (instanceOf<ApiErrorResponse>(e.data.result, 'error')) {
		if (e.data.result.error.code === 'USER_NOT_FOUND_ERROR') {
			return {
				success: false,
				message: get(LL).signup.verifyMail.error.userNotFound()
			};
		} else if (e.data.result.error.code === 'USER_ALREADY_VERIFIED_ERROR') {
			return {
				success: false,
				home: true,
				message: get(LL).signup.verifyMail.error.alreadyAccount()
			};
		} else {
			return {
				success: false,
				message: get(LL).signup.verifyMail.error.updateFailure()
			};
		}
	}
	return {
		success: true,
		message: get(LL).signup.verifyMail.success()
	};
}) satisfies PageLoad;
