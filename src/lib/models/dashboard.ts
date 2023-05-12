import type { Document, ObjectId, WithId } from 'mongodb';

export interface Dashboard extends Document {
	updatedAt: Date;
	owner: ObjectId;
	name: string;
	cameras?: WithId<Camera>[];
	areas?: WithId<Area>[];
}

interface Camera {
	updatedAt: Date;
	name: string;
	url: string;
}
export interface Area {
	name: string;
	activate: boolean;
}
