import { json } from '@sveltejs/kit';
import httpStatus from 'http-status';
import type { APIDataResponse, APIErrorResponse } from '~/lib/models/api-response';

type APIDataResponseWithoutVersion = Omit<APIDataResponse, 'apiVersion'>;
type APIErrorResponseWithoutVersion = Omit<APIErrorResponse, 'apiVersion'>;

class APIResponder {
	private makeResponseInit(init: number | ResponseInit) {
		if (typeof init === 'number') {
			init = { status: init, statusText: httpStatus[init] };
		} else if (init.status && !init.statusText) {
			init.statusText = httpStatus[`${init.status}_MESSAGE`] as string;
		}
		return init;
	}
	public data(response: APIDataResponseWithoutVersion, init: number | ResponseInit = {}) {
		return json(Object.assign({ apiVersion: '1.0' }, response), this.makeResponseInit(init));
	}
	public error(response: APIErrorResponseWithoutVersion, headers?: HeadersInit) {
		return json(
			Object.assign({ apiVersion: '1.0' }, response),
			this.makeResponseInit({ status: response.error.code, headers })
		);
	}
}

export default new APIResponder();
