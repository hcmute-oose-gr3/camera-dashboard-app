import type { ObjectId } from 'mongodb';
import type { DbClient } from '../services/db-client';

interface DashboardRepositoryOptions {
	dbClient: DbClient;
}

export class DashboardRepository {
	private static _instance?: DashboardRepository;
	private static _options?: DashboardRepositoryOptions;

	private _dbClient: DbClient;

	private constructor(options: DashboardRepositoryOptions) {
		this._dbClient = options.dbClient;
	}

	public static useOptions(options: DashboardRepositoryOptions) {
		this._options = options;
	}

	public static get instance() {
		if (!this._instance) {
			if (!this._options) {
				throw new Error('DashboardRepository needs an options to construct its instance');
			}
			this._instance = new DashboardRepository(this._options);
		}
		return this._instance;
	}

	public getCameras(_id: ObjectId) {
		return this._dbClient.collections.dashboards.findOne(
			{ _id },
			{ limit: 1, projection: { cameras: 1 } }
		);
	}
	public getAreas(_id: ObjectId) {
		return this._dbClient.collections.dashboards.findOne(
			{ _id },
			{ limit: 1, projection: { areas: 1 } }
		);
	}
}
