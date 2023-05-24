import type { ObjectId } from 'mongodb';

export interface Profile {
	dashboardId: ObjectId;
	name: string;
	image: {
		publicId: string;
		version: number;
	};
}
