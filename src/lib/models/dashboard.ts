import type { Document, ObjectId } from 'mongodb';

export interface Dashboard extends Document {
	createdAt: Date;
	updatedAt: Date;
	owner: ObjectId;
	name: string;
}
