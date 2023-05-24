import { ObjectId } from 'mongodb';
import { string } from 'zod';

export class Deserializer {
	private static _instance: Deserializer;

	private constructor() {}

	public static get instance() {
		if (!this._instance) {
			this._instance = new Deserializer();
		}
		return this._instance;
	}

	public deserialize(object: Record<string, any> | Record<string, any>[]) {
		if (Array.isArray(object)) {
			for (const i in object) {
				object[i] = this.deserialize(object[i]);
			}
			return object;
		}
		for (const k in object) {
			if (object[k] instanceof ObjectId) {
				object[k] = object[k].toHexString();
				continue;
			}
			if (Array.isArray(object[k])) {
				for (const i in object[k]) {
					object[k][i] = this.deserialize(object[k][i]);
				}
			}
			if (object[k] instanceof Object) {
				object[k] = this.deserialize(object[k]);
			}
		}
		return object;
	}
}
