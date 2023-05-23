import type { WithId } from 'mongodb';
import type { Camera } from './camera';

export interface Area {
	name: string;
	activate: boolean;
	cameras?: WithId<Camera>[];
}
