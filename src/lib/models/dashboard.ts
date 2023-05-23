import type { Document, ObjectId, WithId } from 'mongodb';
import type { Area } from './area';

export interface Dashboard extends Document {
	updatedAt: Date;
	owner: ObjectId;
	name: string;
	areas?: WithId<Area>[];
}
