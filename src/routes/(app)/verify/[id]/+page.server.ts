import type { PageServerLoad } from './$types';
import { page } from '$app/stores';
import { DbClient } from '~/lib/server/services/db-client.js';
import { get } from 'svelte/store';
import { ObjectId, type Condition, type InsertOneResult, type WithId } from 'mongodb';
import type User from '~/lib/models/user';
import httpStatus from 'http-status';
import { ApiResponder } from '~/lib/server/services/api-responder';
import LL from '~/i18n/i18n-svelte';
import { GET } from '~/routes/api/v1/verify/[id]/+server';
import type { ApiDataResponse, ApiResponse } from '~/lib/models/api-response';
import { instanceOf } from '~/lib/utils';

export const load = (async (e) => {
	const result = await GET(e as any).then((v) => v.json() as Promise<ApiResponse>);
	if (instanceOf<ApiDataResponse<string>>(result, 'data')) {
		const token = crypto.randomUUID();
		await DbClient.instance.collections.users.updateOne(
			{
				_id: new ObjectId(e.params.id)
			},
			{ $set: { sessionToken: token } }
		);

		e.cookies.set('session_token', token, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production'
		});
	}
	return {
		result
	};
}) satisfies PageServerLoad;
