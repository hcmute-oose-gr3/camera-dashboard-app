import type { Document, ObjectId, WithId } from 'mongodb';

export interface Dashboard extends Document {
	updatedAt: Date;
	owner: ObjectId;
	name: string;
	cameras?: WithId<Camera>[];
}

interface Camera {
	updatedAt: Date;
	name: string;
	url: string;
}
