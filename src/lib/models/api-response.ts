export interface APIResponse {
	apiVersion: string;
}

export interface APIDataResponse extends APIResponse {
	data: Record<string, any>;
}

export interface APIErrorResponse extends APIResponse {
	error: Record<string, any> & {
		code: number;
		message: string;
	};
}
