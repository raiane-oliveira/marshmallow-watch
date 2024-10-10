import { Token } from "../api";
import { accessTokenCookieName, refreshTokenCookieName } from "../model";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export function getAuth(
	type: "server" | "client" = "client",
	serverCookies?: ReadonlyRequestCookies,
) {
	const accessToken =
		type === "client"
			? getCookie(accessTokenCookieName)
			: serverCookies?.get(accessTokenCookieName)?.value;

	const accessTokenPayload: Token | null = accessToken
		? jwtDecode(accessToken)
		: null;

	if (type === "server") {
		const refreshToken = serverCookies?.get(refreshTokenCookieName)?.value;

		const refreshTokenPayload: Token | null = refreshToken
			? jwtDecode(refreshToken)
			: null;

		return {
			accessToken,
			accessTokenPayload,
			refreshToken,
			refreshTokenPayload,
		};
	}

	return {
		accessToken,
		accessTokenPayload,
	};
}
