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

export interface Media {
	id: string;
	title: string;
	description: string | null;
	genreIds: string[];
	imageUrl?: string;
}

export interface Movie extends Media {
	releaseAt: Date;
}

export interface TvShow extends Media {
	firstAirDate: Date;
}
