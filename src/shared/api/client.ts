import { checkTimestampIsBeforeToday } from "../lib";
import { getAuth, refreshTokenCookieName } from "../model";

interface ApiFetchReturn<B> {
	status: number;
	statusText: string;
	data: B;
	headers?: Headers;
}

class Api {
	private async refreshToken() {
		const isExecutingOnServer = typeof window === "undefined";

		if (isExecutingOnServer) {
			const { refreshToken: refreshTokenCookie, accessTokenPayload } =
				getAuth("server");

			const isAccessTokenExpired =
				accessTokenPayload &&
				checkTimestampIsBeforeToday(accessTokenPayload.exp);

			if (!isAccessTokenExpired || !refreshTokenCookie) {
				return;
			}

			await api.patch<any, { token: string }>(
				"/token/refresh",
				{},
				{
					Cookie: `${refreshTokenCookieName}=${refreshTokenCookie}`,
					"Set-Cookie": `${refreshTokenCookieName}=${refreshTokenCookie}`,
				},
			);

			return;
		}

		const { refreshToken: refreshTokenCookie, accessTokenPayload } = getAuth();

		const isAccessTokenExpired =
			accessTokenPayload && checkTimestampIsBeforeToday(accessTokenPayload.exp);

		if (!isAccessTokenExpired || !refreshTokenCookie) {
			return;
		}

		await api.patch<any, { token: string }>("/token/refresh", {});

		return;
	}

	private api(path: string, init?: RequestInit) {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(path, baseUrl);

		return fetch(url, {
			...init,
			credentials: "include",
		});
	}

	async get<B = any, R = any>(
		path: string,
		data?: B,
		headers?: HeadersInit,
	): Promise<ApiFetchReturn<R>> {
		await this.refreshToken();

		const response = await this.api(path, {
			method: "GET",
			headers: {
				...headers,
				"Content-Type":
					data instanceof FormData ? "multipart/form-data" : "application/json",
			},
			body: data instanceof FormData ? data : JSON.stringify(data),
		});

		const body: R = await response.json();

		return {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
			data: body,
		};
	}

	async post<B = any, R = any>(
		path: string,
		data: B,
		headers?: HeadersInit,
	): Promise<ApiFetchReturn<R>> {
		await this.refreshToken();

		const response = await this.api(path, {
			method: "POST",
			headers: {
				...headers,
				"Content-Type":
					data instanceof FormData ? "multipart/form-data" : "application/json",
			},
			body: data instanceof FormData ? data : JSON.stringify(data),
		});

		const body: R = await response.json();

		return {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
			data: body,
		};
	}

	async put<B = any, R = any>(
		path: string,
		data?: B,
		headers?: HeadersInit,
	): Promise<ApiFetchReturn<R>> {
		await this.refreshToken();

		const response = await this.api(path, {
			method: "PUT",
			headers: {
				...headers,
				"Content-Type":
					data instanceof FormData ? "multipart/form-data" : "application/json",
			},
			body: data instanceof FormData ? data : JSON.stringify(data),
		});

		const body: R = await response.json();

		return {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
			data: body,
		};
	}

	async patch<B = any, R = any>(
		path: string,
		data?: B,
		headers?: HeadersInit,
	): Promise<ApiFetchReturn<R>> {
		await this.refreshToken();

		const response = await this.api(path, {
			method: "PATCH",
			headers: {
				...headers,
				"Content-Type":
					data instanceof FormData ? "multipart/form-data" : "application/json",
			},
			body: data instanceof FormData ? data : JSON.stringify(data),
		});

		const body: R = await response.json();

		return {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
			data: body,
		};
	}

	async delete<B = any, R = any>(
		path: string,
		data?: B,
		headers?: HeadersInit,
	): Promise<ApiFetchReturn<R>> {
		await this.refreshToken();

		const response = await this.api(path, {
			method: "DELETE",
			headers: {
				...headers,
				"Content-Type":
					data instanceof FormData ? "multipart/form-data" : "application/json",
			},
			body: data instanceof FormData ? data : JSON.stringify(data),
		});

		const body: R = await response.json();

		return {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
			data: body,
		};
	}

	async request(path: string, init?: RequestInit) {
		await this.refreshToken();
		return this.api(path, init);
	}
}

export const api = new Api();
