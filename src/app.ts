import { loadAllLocales } from './i18n/i18n-util.sync';
import dotenv from 'dotenv';
import { DbClient } from './lib/server/services/db-client';

loadAllLocales();
dotenv.config();
console.log(process.env.NODE_ENV);
const instance = new DbClient(process.env.MONGO_URI, 'camera-dashboard-app', {
	monitorCommands: process.env.NODE_ENV === 'development'
});

if (process.env.NODE_ENV === 'development') {
	instance.client.on('commandStarted', (event) => console.debug(event));
	instance.client.on('commandSucceeded', (event) => console.debug(event));
	instance.client.on('commandFailed', (event) => console.debug(event));
}

await instance.collections.users.createIndex({ email: 1 });
