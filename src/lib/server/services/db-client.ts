import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import type User from '~/lib/models/user';

dotenv.config();

export class DbClient {
	private static _instance: DbClient;
	private client: MongoClient;
	private _collections: Collections;

	public static get instance() {
		return DbClient._instance;
	}

	constructor(url: string, dbName: string) {
		this.client = new MongoClient(url);
		this._collections = new Collections(this.client.db(dbName));
		DbClient._instance = this;
	}

	public get collections() {
		return this._collections;
	}
}

class Collections {
	constructor(private db: Db) {}
	public get users() {
		return this.db.collection<User>('users');
	}
}
