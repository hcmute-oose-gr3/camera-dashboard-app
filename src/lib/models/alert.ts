import type { ObjectId } from 'mongodb';

export interface Alert {}

export interface TimeBasedAlert extends Alert {
	dashboardId: ObjectId;
	start: string;
	end: string;
	level: number;
}

export interface ProfileBasedAlert extends Alert {}

export interface ZoneBasedAlert extends Alert {
	top: number;
	left: number;
	width: number;
	height: number;
}
