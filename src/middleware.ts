import { routing } from "@/shared/i18n";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { accessTokenCookieName, refreshTokenCookieName } from "@/shared/model";
import { Token } from "@/shared/api";
import { jwtDecode } from "jwt-decode";
import { checkTimestampIsBeforeToday } from "./shared/lib";
import { refreshToken } from "./features/auth/by-credentials";

const handleI18nRouting = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(accessTokenCookieName)
  const refreshTokenCookie = request.cookies.get(refreshTokenCookieName)

  const toHomePage = () => NextResponse.redirect(new URL('/', request.url))

  const refreshTokenPayload: Token | undefined = refreshTokenCookie && jwtDecode(refreshTokenCookie.value)
  const isRefreshTokenExpired = refreshTokenPayload && checkTimestampIsBeforeToday(refreshTokenPayload.exp)

  if (isRefreshTokenExpired) {
    request.cookies.delete([accessTokenCookieName, refreshTokenCookieName])

    return toHomePage()
  }

  const accessTokenPayload: Token | undefined = accessToken && jwtDecode(accessToken.value)
  const isAccessTokenExpired = accessTokenPayload && checkTimestampIsBeforeToday(accessTokenPayload.exp)

  if ((!accessToken || isAccessTokenExpired) && refreshTokenCookie) {
    const response = await refreshToken()

    if (!response.data?.token) {
      return toHomePage()
    }

    request.cookies.set(accessTokenCookieName, response.data.token)

    return NextResponse.redirect(request.nextUrl)
  }

  return handleI18nRouting(request)
}

export const config = {
  matcher: [
    '/', `/(en|pt-BR)/:path*`
  ]
}
