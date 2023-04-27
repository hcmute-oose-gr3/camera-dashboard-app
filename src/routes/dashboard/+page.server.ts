import type { PageServerLoad } from '../$types';
import { ObjectId } from 'mongodb';
import { UserRepository } from '~/lib/server/repositories/user-repository';

export const load = (async ({ locals }) => {
	return {
		dashboards: await UserRepository.instance
			.getDashboard(new ObjectId(locals.user!._id))
			.then((v) =>
				v.map((e) =>
					Object.assign(e, {
						_id: e._id.toHexString(),
						owner: e.owner.toHexString(),
						createdAt: e._id.getTimestamp()
					})
				)
			)
	};
}) satisfies PageServerLoad;
