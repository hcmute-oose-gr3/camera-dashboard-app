import { json } from '@sveltejs/kit';
import httpStatus from 'http-status';
import type { ApiDataResponse, ApiErrorResponse } from '~/lib/models/api-response';

type APIDataResponseWithoutVersion<T> = Omit<ApiDataResponse<T>, 'apiVersion'>;
type APIErrorResponseWithoutVersion = Omit<ApiErrorResponse, 'apiVersion'>;

interface ApiResponderOptions {
	apiVersion: string;
}

export class ApiResponder {
	private static _options: ApiResponderOptions;
	private static _instance: ApiResponder;

	private _options: ApiResponderOptions;

	private constructor(options: ApiResponderOptions) {
		this._options = options;
	}

	public static useOptions(options: ApiResponderOptions) {
		this._options = options;
	}

	public static get instance() {
		if (!this._instance) {
			if (!this._options) {
				throw new Error('ApiResponder needs an options to construct its instance');
			}
			this._instance = new ApiResponder(this._options);
		}
		return this._instance;
	}

	private makeResponseInit(init: number | ResponseInit) {
		if (typeof init === 'number') {
			init = { status: init, statusText: httpStatus[init] };
		} else if (init.status && !init.statusText) {
			init.statusText = httpStatus[`${init.status}_MESSAGE`] as string;
		}
		return init;
	}
	public data<T>(response: APIDataResponseWithoutVersion<T>, init: number | ResponseInit) {
		return json(
			Object.assign({ apiVersion: this._options.apiVersion }, response),
			this.makeResponseInit(init)
		);
	}
	public error(response: APIErrorResponseWithoutVersion, init: number | ResponseInit) {
		return json(
			Object.assign({ apiVersion: this._options.apiVersion }, response),
			this.makeResponseInit(init)
		);
	}
}
