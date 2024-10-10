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
	username: string;
	iat: number;
	exp: number;
}

export interface CurrentUserApi {
	id: string;
	name: string;
	username: string;
	email: string;
	avatarUrl?: sring | null;
	updatedAt?: null | Date;
	createdAt: Date;
}

export type PublicUserApi = Omit<CurrentUserApi, "email">;
