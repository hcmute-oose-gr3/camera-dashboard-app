import type { ObjectId } from 'mongodb';

export interface Alert {
	dashboardId: ObjectId;
	name: string;
}

export interface TimeBasedAlert extends Alert {
	startTime: string;
	endTime: string;
	alertLevel: number;
}

export interface ProfileBasedAlert extends Alert {
	profileId: ObjectId;
}

export interface ZoneBasedAlert extends Alert {
	cameraId: ObjectId;
	top: number;
	left: number;
	width: number;
	height: number;
}
