import { Db, MongoClient, type MongoClientOptions } from 'mongodb';
import type User from '~/lib/models/user';

export class DbClient {
	private static _instance: DbClient;
	private _client: MongoClient;
	private _collections: Collections;

	public static get instance() {
		return DbClient._instance;
	}

	constructor(url: string, dbName: string, options?: MongoClientOptions) {
		this._client = new MongoClient(url, options);
		this._collections = new Collections(this._client.db(dbName));
		DbClient._instance = this;
	}

	public get collections() {
		return this._collections;
	}

	public get client() {
		return this._client;
	}
}

class Collections {
	constructor(private db: Db) {}
	public get users() {
		return this.db.collection<User>('users');
	}
}
