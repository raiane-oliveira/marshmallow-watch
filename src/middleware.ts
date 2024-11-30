import { routing } from "@/shared/i18n";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { accessTokenCookieName, refreshTokenCookieName } from "@/shared/model";
import { api, Token } from "@/shared/api";
import { jwtDecode } from "jwt-decode";
import { checkTimestampIsBeforeToday } from "./shared/lib";

const handleI18nRouting = createMiddleware(routing);

const privateRoutes = ["/favorites", "/playlists"];

export default async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get(accessTokenCookieName);
	const refreshTokenCookie = request.cookies.get(refreshTokenCookieName);

	const toHomePage = () => NextResponse.redirect(new URL("/", request.url));

	const refreshTokenPayload: Token | undefined =
		refreshTokenCookie && jwtDecode(refreshTokenCookie.value);
	const isRefreshTokenExpired =
		refreshTokenPayload && checkTimestampIsBeforeToday(refreshTokenPayload.exp);

	if (isRefreshTokenExpired) {
		request.cookies.delete([accessTokenCookieName, refreshTokenCookieName]);

		return toHomePage();
	}

	const pathnameWithoutLocale =
		"/" + request.nextUrl.pathname.split("/").slice(2).join();
	const isPrivateRoute = privateRoutes.includes(pathnameWithoutLocale);

	if (isPrivateRoute && (!refreshTokenCookie || isRefreshTokenExpired)) {
		return toHomePage();
	}

	const accessTokenPayload: Token | undefined =
		accessToken && jwtDecode(accessToken.value);
	const isAccessTokenExpired =
		accessTokenPayload && checkTimestampIsBeforeToday(accessTokenPayload.exp);

	if ((isAccessTokenExpired || !accessToken) && refreshTokenCookie) {
		const response = await api.patch<any, { token: string }>(
			"/token/refresh",
			{},
			{
				Cookie: `${refreshTokenCookie.name}=${refreshTokenCookie.value}`,
				"Set-Cookie": `${refreshTokenCookie.name}=${refreshTokenCookie.value}`,
			},
		);

		if (!response.data.token) {
			return toHomePage();
		}

		const nextResponse = NextResponse.redirect(request.nextUrl);
		nextResponse.cookies.set(accessTokenCookieName, response.data.token);

		return nextResponse;
	}

	return handleI18nRouting(request);
}

export const config = {
	matcher: ["/", `/(en|pt-BR)/:path*`],
};
