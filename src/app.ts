import { loadAllLocales } from './i18n/i18n-util.sync';
import dotenv from 'dotenv';
import { DbClient } from './lib/server/services/db-client';
import { APIResponder } from './lib/server/services/api-responder';

loadAllLocales();
dotenv.config();

DbClient.useOptions({
	url: process.env.MONGO_URI,
	dbName: 'camera-dashboard-app',
	mongoClientOptions: {
		monitorCommands: process.env.NODE_ENV === 'development'
	}
});

APIResponder.useOptions({ apiVersion: '1.0' });

const instance = DbClient.instance;

if (process.env.NODE_ENV === 'development') {
	instance.client.on('commandStarted', (event) => console.debug(event));
	instance.client.on('commandSucceeded', (event) => console.debug(event));
	instance.client.on('commandFailed', (event) => console.debug(event));
}

await instance.collections.users.createIndex({ email: 1 });
