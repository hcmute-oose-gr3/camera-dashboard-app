export interface Camera {
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
