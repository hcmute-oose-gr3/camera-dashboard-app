import type { Document, ObjectId } from 'mongodb';

export default interface User extends Document, Partial<UserData> {
	email: string;
	password: string;
}

interface UserData {
	dashboards: ObjectId[];
	sessionToken: string;
}
