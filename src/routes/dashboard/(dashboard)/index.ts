import type { Writable } from 'svelte/store';

export interface PageMeta {
	title: string;
}

export type WritablePageMeta = Writable<PageMeta>;
