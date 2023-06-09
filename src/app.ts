import { loadAllLocales } from './i18n/i18n-util.sync';
import dotenv from 'dotenv';
import { DbClient } from './lib/server/services/db-client';
import { ApiResponder } from './lib/server/services/api-responder';
import { UserRepository } from './lib/server/repositories/user-repository';
import { DashboardRepository } from './lib/server/repositories/dashboard-repository';
import { Cloudinary } from './lib/server/services/cloudinary';

loadAllLocales();
dotenv.config();

ApiResponder.useOptions({ apiVersion: '1.0' });

DbClient.useOptions({
	url: process.env.MONGO_URI,
	dbName: 'camera-dashboard-app',
	mongoClientOptions: {
		monitorCommands: process.env.NODE_ENV === 'development',
	},
});
UserRepository.useOptions({ dbClient: DbClient.instance });
DashboardRepository.useOptions({ dbClient: DbClient.instance });
Cloudinary.useOptions({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const instance = DbClient.instance;

if (process.env.NODE_ENV === 'development') {
	// instance.client.on('commandStarted', (event) => console.debug(event));
	// instance.client.on('commandSucceeded', (event) => console.debug(event));
	instance.client.on('commandFailed', (event) => console.debug(event));
}

await instance.collections.users.createIndex({ email: 1 });
