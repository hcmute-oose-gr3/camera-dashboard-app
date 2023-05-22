import { writable } from 'svelte/store';

export interface PageMeta {
	title: string;
}

export const meta = writable<PageMeta>({ title: '' });
