import type { Alert, ZoneBasedAlert } from './alert';

export interface Camera {
	updatedAt: Date;
	name: string;
	url: string;
	connection: CameraConnection;
	securityLevel: CameraSecurityLevel;
	alert?: ZoneBasedAlert;
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
