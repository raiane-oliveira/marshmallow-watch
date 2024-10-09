export interface ApiErrorResponse {
	message: string;
	issues?: {
		[key: string]: string[];
	};
}

export interface ApiResponse<T> {
	status: number;
	statusText: string;
	data: T;
}

export interface Token {
	sub: string;
	iat: number;
	exp: number;
}
