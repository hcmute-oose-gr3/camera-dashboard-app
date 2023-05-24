export class Pageable {
	private _page: number;
	private _size: number;

	constructor(page: any, size: any) {
		page = Number(page);
		size = Number(size) || 200;
		if (isNaN(page)) {
			page = 0;
		}
		this._page = page;
		this._size = size;
	}

	public get page() {
		return this._page;
	}

	public get size() {
		return this._size;
	}

	public get offset() {
		return this._page * this._size;
	}
}
