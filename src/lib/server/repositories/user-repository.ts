import type { ObjectId, WithId } from 'mongodb';
import type { Dashboard } from '~/lib/models/dashboard';
import type { DbClient } from '../services/db-client';

interface UserRepositoryOptions {
	dbClient: DbClient;
}

export class UserRepository {
	private static _instance?: UserRepository;
	private static _options?: UserRepositoryOptions;

	private _dbClient: DbClient;

	private constructor(options: UserRepositoryOptions) {
		this._dbClient = options.dbClient;
	}

	public static useOptions(options: UserRepositoryOptions) {
		this._options = options;
	}

	public static get instance() {
		if (!this._instance) {
			if (!this._options) {
				throw new Error('UserRepository needs an options to construct its instance');
			}
			this._instance = new UserRepository(this._options);
		}
		return this._instance;
	}

	public async getDashboard(_id: ObjectId) {
		return await this._dbClient.collections.users
			.aggregate<WithId<Dashboard>>([
				{ $match: { _id } },
				{ $limit: 1 },
				{ $project: { dashboards: 1 } },
				{
					$lookup: {
						from: 'dashboards',
						localField: 'dashboards',
						foreignField: '_id',
						as: 'dashboardsInfo'
					}
				},
				{ $unwind: '$dashboardsInfo' },
				{ $project: { dashboardsInfo: { cameras: 0, areas: 0 } } },
				{
					$replaceRoot: {
						newRoot: '$dashboardsInfo'
					}
				}
			])
			.toArray();
	}
}
