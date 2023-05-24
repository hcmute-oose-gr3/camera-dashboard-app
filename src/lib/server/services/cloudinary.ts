import { type Db, MongoClient, type MongoClientOptions } from 'mongodb';
import type { Alert } from '~/lib/models/alert';
import type { Dashboard } from '~/lib/models/dashboard';
import type User from '~/lib/models/user';
import { v2 as cloudinary, type ConfigOptions } from 'cloudinary';

interface CloudinaryOptions extends ConfigOptions {}

export class Cloudinary {
	private static _instance?: typeof cloudinary;
	private static _options?: CloudinaryOptions;

	private constructor(options: CloudinaryOptions) {
		cloudinary.config(options);
	}

	public static useOptions(options: CloudinaryOptions) {
		this._options = options;
	}

	public static get instance() {
		if (!this._instance) {
			if (!this._options) {
				throw new Error('Cloudinary needs an options to construct its instance');
			}
			new Cloudinary(this._options);
			this._instance = cloudinary;
		}
		return this._instance;
	}
}
