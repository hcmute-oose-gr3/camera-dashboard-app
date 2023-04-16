import { loadAllLocales } from './i18n/i18n-util.sync';
import dotenv from 'dotenv';
import { DbClient } from './lib/server/services/db-client';

loadAllLocales();
dotenv.config();
new DbClient(process.env.MONGO_URI, 'camera-dashboard-app');

await DbClient.instance.collections.users.createIndex({ email: 1 });
