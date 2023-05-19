import type { Document, ObjectId, WithId } from 'mongodb';
import type { Area } from './area';

export interface Dashboard extends Document {
	updatedAt: Date;
	owner: ObjectId;
	name: string;
	areas?: WithId<Area>[];
}

export interface Area {
	name: string;
	activate: boolean;
	cameras?: WithId<Camera>[];
}

export interface Camera {
	updatedAt: Date;
	name: string;
	url: string;
	connection: CameraConnection;
	securityLevel: CameraSecurityLevel;
}
export interface Statistic {
	updatedAt: Date;
	name: string;
	url: string;
	connection: CameraConnection;
	securityLevel: CameraSecurityLevel;
}
export enum CameraConnection {
	Disconnected,
	Connected,
}

export enum CameraSecurityLevel {
	Low,
	Medium,
	High,
}
