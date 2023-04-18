export interface ApiResponse {
	apiVersion: string;
}

export interface ApiDataResponse extends ApiResponse {
	data: Record<string, any>;
}

export interface ApiErrorResponse extends ApiResponse {
	error: Record<string, any> & {
		code: number;
		message: string;
	};
}
